import dotenv from 'dotenv'

dotenv.config()

const PORT=process.env.PORT
const MONGO_USERNAME=process.env.MONGO_USERNAME
const MONGO_PASSWORD=process.env.MONGO_PASSWORD


const mongo={
    username:MONGO_USERNAME,
    password:MONGO_PASSWORD
}

const config={
    port:PORT,
    mongo:mongo
}

export default config