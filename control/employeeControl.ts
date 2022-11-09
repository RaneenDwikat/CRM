import { NextFunction,Request,Response} from 'express'
import Employee from '../model/employee'
import jwt from 'jsonwebtoken';

export default class EmployeeControl{
    addEmployee=async (req:Request,res:Response,next:NextFunction)=> {
        const{username,email,password}=req.body
        try {
            await new Employee({username,email,password}).save()
            return res.status(201).json({status:true,msg:"created"})
        } catch (error) {
           console.log(error)
           res.status(500).json({error:error}) 
        }
    }

    employeeLogin= async (req:Request,res:Response,next:NextFunction)=> {
        const{email,password}=req.body
        try {
          const user=await Employee.findOneAndUpdate({email:email,password:password},{last_login:Date()})
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
