import {Telegraf} from 'telegraf'

class Bot{
    constructor(){
        this.bot = new Telegraf(process.env.BOT_TOKEN);
        this.bot.on('message', async (ctx) => {
            
            ctx.reply(ctx.update.message.from)
        })

        this.bot.launch()

        Date.prototype.addHours= function(h){ this.setHours(this.getHours()+h); return this; }
    }
    newVisits(ip){
        let admins = process.env.BOT_ADMINS.split(',')
        for(let item of admins){
            let time =new Date().addHours(3).toISOString().split('T').join(' ')
            this.bot.telegram.sendMessage(item,'new Visit '+ip+' '+time)
        }
        
    }
    creatRequest(data){
        let msg=`❗❗❗ЗАПРОС❗❗❗
${new Date().addHours(3).toISOString().split('T').join(' ')}
❗❗❗❗❗❗❗❗❗
Тип: ${data.typeRequest}
Наличка: ${data.is_cash?"Да":"Нет"}
Актив: ${data.asset}
Сеть: ${data.network}
Значения актива: ${data.valueAsset}
Кошелек: ${data.addressAsser}
Тип оплаты: ${data.typePay}
Количество руб: ${data.valueFiat}
Номер счета: ${data.addressFiat}
Город: ${data.city}
Контакт: ${data.contact}
Комент : ${data.comment}`
        let admins = process.env.BOT_ADMINS.split(',')
        for(let item of admins){
            let time =new Date().addHours(3).toISOString().split('T').join(' ')
            this.bot.telegram.sendMessage(item,msg)
        }
    }
}
export default new Bot()