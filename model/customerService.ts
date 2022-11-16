import mongoose from 'mongoose'

interface CustomerService{

    customer:mongoose.Schema.Types.ObjectId,
    service:mongoose.Schema.Types.ObjectId,
    status:string
}

const CustomerServiceSchema=new mongoose.Schema<CustomerService>({
    status:{type:String,enum:['active','stopped']},
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'customers'
      },
      service:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'services'
      }
  
},  {timestamps:true})

export default mongoose.model<CustomerService>("customerService",CustomerServiceSchema)