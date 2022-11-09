import mongoose from 'mongoose'
import config from '../../config/config.config'


const username=config.mongo.username
const password= config.mongo.password

const database=`mongodb+srv://${username}:${password}@cluster0.pjp0ilf.mongodb.net/?retryWrites=true&w=majority`

export async function connectDB() {
    try {
        const conn=await mongoose.connect(database)
        console.log("connected with database")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    
}

