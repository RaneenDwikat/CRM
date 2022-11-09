import mongoose from 'mongoose'

interface service{
    title:string,
    description:string,
    activate:Array<mongoose.Schema.Types.ObjectId>,
    stop:Array<mongoose.Schema.Types.ObjectId>
}

const serviceSchema=new mongoose.Schema<service>({
    title:{type:String},
    description:{type:String},
    activate:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'customers'
      }],
      stop:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'customers'
      }]
  
},  {timestamps:true})

export default mongoose.model<service>("services",serviceSchema)