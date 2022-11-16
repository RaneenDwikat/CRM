import mongoose from 'mongoose'

interface service{
    title:string,
    description:string

}

const serviceSchema=new mongoose.Schema<service>({
    title:{type:String},
    description:{type:String}
},  {timestamps:true})

export default mongoose.model<service>("services",serviceSchema)