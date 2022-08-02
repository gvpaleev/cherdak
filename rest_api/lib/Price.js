import BnbSpotPrice from './BnbSpotPrice.js'

class Price{
    constructor(){

    }
    getPrice(){
        let {btcusdt,ethusdt,bnbusdt,xmrusdt,usdtrub} = BnbSpotPrice.price
        let price={
            'btc':btcusdt*usdtrub,
            'eth':ethusdt*usdtrub,
            'bnb':bnbusdt*usdtrub,
            'xmr':xmrusdt*usdtrub,
            'usdt':usdtrub
        }
        return price
    }

    getPriceBuy() {
        let price = this.getPrice()

        for(let key in price){

            price[key]*=process.env.COEFFICIENT_BUY
        }
        return price
    }

    getPricerSell(){
        let price = this.getPrice()

        for(let key in price){

            price[key]*=process.env.COEFFICIENT_SELL
        }
        return price
    }

    getPriceFull(){
        return {
            'buy':this.getPriceBuy(),
            'sell':this.getPricerSell()
        }
    }
}
export default new Price()