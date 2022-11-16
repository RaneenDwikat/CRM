import { NextFunction,Request,Response} from 'express'
import Service from '../model/service'

export default class serviceControl{
    addService=async (req:Request,res:Response,next:NextFunction)=> {
        const{title,description}=req.body
        try {
            await new Service({title,description}).save()
            return res.status(201).json({status:true,msg:"created"})
        } catch (error) {
           console.log(error)
           res.status(500).json({error:error}) 
        }
    }

    deleteService=async (req:Request,res:Response,next:NextFunction)=> {
        const{_id}=req.params
        try {
            await Service.findByIdAndDelete({_id})
            return res.status(200).json({status:true,msg:"deleted"})
        } catch (error) {
           console.log(error)
           res.status(500).json({error:error}) 
        }
    }

}
