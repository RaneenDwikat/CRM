import { NextFunction,Request,Response } from 'express'
import Super from '../model/super'
import jwt from 'jsonwebtoken'
export default class SuperControl{
      addSuper=async (req:Request,res:Response,next:NextFunction)=> {
        const {email,password}=req.body
        try {
            await new Super({email,password}).save()
            return res.status(201).json({status:true,msg:"success"})
        } catch (error) {
           console.log(error)
           res.status(500).json({error:error}) 
        }
    }
    
      superLogin= async (req:Request,res:Response,next:NextFunction)=> {
        const{email,password}=req.body
        try {
          const user=await Super.findOneAndUpdate({email:email,password:password},{last_login:Date()})
          if(!user)
         {
           return res.status(204).json({ success: false, msg: "try another email  or password" });
         }else{
          let  token=jwt.sign({"_id":user._id},'secret')
          return res.status(200).json({ success: true,token:token, msg: "Authenticated", });
         }
        } catch (error) {
           return res.status(500).json({ success: false, msg: error });
        }
      }
      
}

