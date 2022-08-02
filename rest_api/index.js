import express from 'express'
import 'dotenv/config'
import Price from './lib/Price.js'
import 'fs'
import  path from 'path';
import { fileURLToPath } from 'url';
import Bot from './lib/telegramBot.js'
import cors  from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let app = express()


app.use(express.static(path.join(__dirname, 'build')));



app.use(cors())
app.use(express.json())


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/api/price/full', (req, res) => {
  let price = Price.getPriceFull()
  res.header("Access-Control-Allow-Origin", "*")
  res.send(JSON.stringify(price))
  //console.log(BnbSpotPrice)
})


app.get('/api/asset',(req, res)=>{
  //console.log(process.env.ASSET)
  let asset = JSON.parse(process.env.ASSET)
  res.header("Access-Control-Allow-Origin", "*")
  res.send(JSON.stringify(asset))
})
app.get('/api/paytypes',(req, res)=>{
  
  let payTypes = JSON.parse(process.env.PAY_TYPES)
  res.header("Access-Control-Allow-Origin", "*")
  res.send(JSON.stringify(payTypes))
})

app.get('/api/network/full',(req, res)=>{
  let ip= req.ip.split(':')[3]
  Bot.newVisits(ip)
  let network_In = JSON.parse(process.env.NETWORK_IN)
  let network_Out = JSON.parse(process.env.NETWORK_OUT)
  let data={
    'network_In':network_In,
    'network_Out':network_Out
  }
  res.header("Access-Control-Allow-Origin", "*")
  res.send(JSON.stringify(data))
})

app.post('/api/set/request',(req, res)=>{
  let data = Object.assign(req.body)
  data.ip=req.ip.split(':')[3]

  Bot.creatRequest(data)

  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', "*")
  res.send()
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})