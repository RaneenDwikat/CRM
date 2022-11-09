
import { connectDB } from './utils/mongo/connectDB'
import { connectRedis } from './utils/redis/connectRedis'
import config from './config/config.config'
import superRouter from './routers/superRouter'
import employeeRouter from './routers/employeeRouter'
import customerRouter from './routers/customerRouter'
import serviceRouter from './routers/serviceRouter'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import YAML from 'yamljs'
import sweggerUI from 'swagger-ui-express'
import jwt from 'jsonwebtoken'
connectDB()
connectRedis()

const swaggerDoc=YAML.load('./swagger/openapi.yaml')
const app=express()

if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}
let  token=jwt.sign({"_id":'636a1a805d2c5edd41cf249c'},'secret')
console.log(token)
  token=jwt.sign({"_id":'636a54676724e3bcb4cfea25'},'secret')
console.log(token)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/super',superRouter)
app.use('/employee',employeeRouter)
app.use('/customer',customerRouter)
app.use('/service',serviceRouter)
app.use("/swagger",sweggerUI.serve,sweggerUI.setup(swaggerDoc))
const port= config.port

app.listen(port,():void=>{
    console.log(`connected with port= ${port}`)
})
