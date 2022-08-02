
import { Spot } from '@binance/connector'

class BnbSpotPrice{
    constructor(){

        let apiKey = process.env.BINACE_API_KEY
        let apiSecret = process.env.BINACE_API_KEY_SECRET
        this.client = new Spot(apiKey, apiSecret)
        this.price={
            //rub

            usdtrub:0,

            //usdt
            xmrusdt:0,
            bnbusdt:0,
            btcusdt:0,
            //BusdUsdt:0,
            ethusdt:0,
            //ShibUsdt:0,

            //busdt

            //BnbBusd:0,
            //BtcBusd:0,
            //ShibBusd:0,
            //EthBusd:0,
            //BtcBusd:0,
            //btc
        
            //BnbBtc:0,
            //EthBtc:0,
            
            //eth

            //BnbEth:0
        }
        

        this.install()
    }
    async install(){
        

        for(let key in this.price){
            let cb ={
                open: () =>  this.client.logger.log('open '+key),
                close: () =>  this.client.logger.log('closed'),
                message: data => {data = JSON.parse(data);this.price[key]=data.p}
            }
            this.client.aggTradeWS(key, cb)
        }

    }
}

export default new BnbSpotPrice()