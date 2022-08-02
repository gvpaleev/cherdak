axios = require('axios')

class P2pData{
    constructor(){
        this.url='https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';
        this.sample={
            "page": 1,
            "rows": 10,
            "payTypes": [],
            "countries": [],
            "publisherType": null,
            "asset": "",
            "fiat": "",
            "tradeType": ""
        }
        this.data={
            time:0,
            spreds:{}
        }
        this.payType=['QIWI','Tinkoff','YandexMoney','ABank','HomeCreditBank','MTSBank','RosBank','RaiffeisenBankRussia','RUBfiatbalance'];
        this.token = ['USDT','BTC','BUSD','BNB','ETH','SHIB']
                
        this.initData()
        //setInterval(()=>{this.initData()},15000);
    };

    async initData() {
        let prom=[];
        let optionsAll=[]
        this.data.table={}


        // Собираем список опций для запросов
        for(let tradeType of ['BUY','SELL']){
            for(let asset of this.token){
                for(let fiat of ['RUB']){
                    for(let payTypes of this.payType){
                        let option = Object.assign(this.sample);
                        option.tradeType=tradeType;
                        option.asset=asset;
                        option.fiat=fiat;
                        option.payTypes=[payTypes];
                        optionsAll.push(JSON.stringify(option))
                    }
                }
            }

        }

        optionsAll.forEach((option)=>{
            prom.push(axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',JSON.parse(option)))
        })

        await Promise.all(prom).then(arr=>{
            this.data.time=+new Date()
            this.data.spreds={};

            arr.forEach(item=>{
                item.data.data.forEach(trade=>{
                    let asset = trade.adv.asset
                    let nickName = trade.advertiser.nickName
                    let price = trade.adv.price
                    let tradeType = trade.adv.tradeType
                    //Токен
                    if(!(asset in this.data.spreds)){
                        this.data.spreds[asset]={}
                    }
                    // Тип Buy Sell
                    if(!(tradeType in this.data.spreds[asset])){
                        this.data.spreds[asset][tradeType]={}
                    }

                    trade.adv.tradeMethods.forEach(tradeMethods=>{
                        let payType = tradeMethods.payType
                        if(!(payType in this.data.spreds[asset][tradeType])){
                            this.data.spreds[asset][tradeType][payType]=[]
                        }
                        this.data.spreds[asset][tradeType][payType].push({'nickName':nickName,'price':price})
                        
                    })

                  
                })
                
            })
            //ПредОбработка
            for(let asset in this.data.spreds){
                for(let tradeType in this.data.spreds[asset]){
                    for(let payType in this.data.spreds[asset][tradeType]){
                        //сорт
                        if(tradeType=='BUY'){
                            this.data.spreds[asset][tradeType][payType].sort(
                                (a,b)=>{
                                    if(+a.price<+b.price){
                                        return 1
                                    }
                                    else{
                                        return -1
                                    }
                                }
                            )
                        }else{
                            this.data.spreds[asset][tradeType][payType].sort(
                                (a,b)=>{
                                    if(+a.price>+b.price){
                                        return 1
                                    }
                                    else{
                                        return -1
                                    }
                                }
                            )
                        }

                        //Дубли
                        this.data.spreds[asset][tradeType][payType] = this.data.spreds[asset][tradeType][payType].filter((item,index)=>{

                        for(let i=index+1;i<this.data.spreds[asset][tradeType][payType].length;i++){
                            if(item.nickName==this.data.spreds[asset][tradeType][payType][i].nickName){
                                return false
                            }
                        }
                        return true
                        })


                        this.data.spreds[asset][tradeType][payType].forEach(item=>{
                            if(!(payType in this.data.spreds)){
                                this.data.spreds[payType]={}
                            }
                            if(!(asset in this.data.spreds[payType])){
                                this.data.spreds[payType][asset]=[]
                            }
                            

                            this.data.spreds[payType][asset].push({'tradeType':tradeType,'data':item})

                           
                        })
                        

                    }
                }
            }


            //console.log('sdad')
            for(let payType of this.payType){
                
                
                for(let token of this.token){
                    let bufBuy=[]
                    let bufSell=[]
                    this.data.spreds[payType][token].forEach(item=>{
                        if(item.tradeType == 'BUY'){
                            bufBuy.push(item.data)
                        }else{
                            bufSell.push(item.data)
                        }
                    })

                    //console.log('bufBuy'+bufBuy.length+' bufSell'+bufSell.length)
                    let count  = bufBuy.length<bufSell.length ? bufBuy.length :bufSell.length
                    
                    let buf=[]
                    bufBuy.sort((a,b)=>{
                    
                        if(+a.price<+b.price){
                            return 1
                        }
                        else{
                            return -1
                        }
                        
                    })
                   
                    bufSell.sort((a,b)=>{
                        if(+a.price>+b.price){
                            return 1
                        }
                        else{
                            return -1
                        }
                    })
                    
                    for(let i = 0 ; i< count;i++){
                        let spred =  (((bufSell[i].price-bufBuy[i].price).toFixed(2))/bufBuy[i].price).toFixed(5)
                        buf.push([bufSell[i].nickName,bufSell[i].price,(spred*100).toFixed(2),bufBuy[i].price,bufBuy[i].nickName])
                    }
                    this.data.spreds[payType][token]=buf
                }
            }
            
            // for(let key of this.payType){
            //     this.data.spreds[key].table=[]
            //     for()
            // }
            

            
        })
        .catch(err=>{
            console.log(err)
        })
    }

    async getSpreds(typePay,ctx){
        //Проверка на время
        if((+new Date()-this.data.time)>10000){
            ctx.reply('Сек ...')
            await this.initData()
        }

        let buf=[]
        for(let token in this.data.spreds[typePay]){

            let line=[token]
            line.push(...this.data.spreds[typePay][token][0])
            
            buf.push(line)
            
        }
        buf.unshift(this.data.time)
        return buf
    }

    async getTopSpredsPayType(ctx){
        //Проверка на время
        if((+new Date()-this.data.time)>10000){
            ctx.reply('Сек ...')
            await this.initData()
        }
        let buf=[]
        for(let payType of this.payType){
            for(let token in this.data.spreds[payType]){
                let line =[]
                line.push(payType)
                line.push(token)
                line.push(...this.data.spreds[payType][token][0])
                buf.push(line)
            }
        }
        buf.unshift(this.data.time)
        return buf;
    }
    async getTopSpredsNotPayType(ctx){
        if((+new Date()-this.data.time)>10000){
            ctx.reply('Сек ...')
            await this.initData()
        }
        let buf=[]
        for(let token of this.token){
            let MaxBuy={'data':{price: 0 }}
            let MinSell={'data':{price: 0 }}
            
            for (let typePay of this.payType){
                //console.log(this.data.spreds[token].BUY[typePay])
                if(+MaxBuy.data.price < +this.data.spreds[token].BUY[typePay][0].price){
                    MaxBuy ={'typePay':typePay,'data':this.data.spreds[token].BUY[typePay][0]}
                }
                
            }
            for (let typePay of this.payType){
                //console.log(this.data.spreds[token].BUY[typePay])
                if(+MinSell.data.price < +this.data.spreds[token].SELL[typePay][0].price){
                    MinSell ={'typePay':typePay,'data':this.data.spreds[token].SELL[typePay][0]}
                }
                
            }
            buf.push({'token':token,'buy':MaxBuy,'sell':MinSell})
        }
            
        buf.unshift(this.data.time)
        return buf
    }
}

module.exports=new P2pData()