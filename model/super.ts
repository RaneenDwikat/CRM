import mongoose from 'mongoose'

 interface superAdmin{
    email:string,
    password:string,
    last_login:Date
}

export const superSchema =new mongoose.Schema <superAdmin>({
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
last_login:{
    type:Date,
    default:Date.now()
}
},{timestamps:true})

export default  mongoose.model <superAdmin>("supers",superSchema)