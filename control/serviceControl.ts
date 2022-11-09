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
    stopService=async (req:Request,res:Response,next:NextFunction)=> {
        const{_id}=req.params
        const{service_id}=req.body
        try {
            await Service.updateOne(
                {_id: service_id,},
                {
                    $pull: {
                        activate:_id,
                    },
                });
                await Service.updateOne(
                    {_id: service_id,},
                    {
                        $push: {
                            stop:_id,
                        },
                    })
            return res.status(200).json({status:true,msg:"stopped"})
        } catch (error) {
           console.log(error)
           res.status(500).json({error:error}) 
        }
    }
    updateService=async (req:Request,res:Response,next:NextFunction)=> {
        const{_id}=req.params
        const{title,description}=req.body
        try {
            await Service.findByIdAndUpdate(
                {_id},
                {
                    title,description
                })
               
            return res.status(200).json({status:true,msg:"updated"})
        } catch (error) {
           console.log(error)
           res.status(500).json({error:error}) 
        }
    }
}
