import { NextFunction, Request, Response } from "express";
import { setCache, getCache } from "../middleware/cache";
import Customer from "../model/customer";
import service from "../model/service";
import Service from "../model/service";

export default class CustomerControl {
    addCustomer = async (req: Request, res: Response, next: NextFunction) => {
        const { username, password, email } = req.body;
        try {
            const user = await new Customer({ username, email, password }).save();
            return res.status(201).json({ status: true, msg: "created" });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    };

    addService = async (req: Request, res: Response, next: NextFunction) => {
        const { service_id} = req.body;
        const { _id } = req.params;
        console.log(req.body.service_id)
        try {
            await Customer.updateOne(
                { _id}, {$push: { services: service_id }, }
            );
            await Service.updateOne(
                {_id:service_id}, {$push: { activate: _id }, }
            );
            return res.status(200).json({ status: true, msg: "added" });
        } catch (error) {
            return res.status(500).json({ status: false, msg: error });
        }
    };

    deleteService = async (req: Request, res: Response, next: NextFunction) => {
        const { service_id} = req.body;
        const { _id } = req.params;
        console.log(req.params)
        try {
            await Customer.updateOne(
                { _id,},
                {
                    $pull: {
                        services:service_id,
                    },
                }
            );
            await Service.updateOne(
                {_id: service_id,},
                {
                    $pull: {
                        activate:_id,
                        stop:_id,
                    },
                }
            );
            return res.status(200).json({ status: true, msg: "deleted"});
        } catch (error) {
            return res.status(500).json({ status: false, msg: error });
        }
    };

   
    getwithServices=async(req: Request, res: Response, next: NextFunction)=>{
        const {_id}=req.params
        try {
            const result=await getCache(`get_${_id}_withServices`)
            if(result!=null){
                return res.status(200).json({status:true,msg:result})
            }
           else{
            const result= await Customer.findOne({_id}).populate({
                path:"services",select:"-activate -__v -_id -stop"
                }).exec()
                if(result){
                    await setCache(`get_${_id}_withServices`,JSON.stringify(result),3600)
                    return res.status(200).json({status:true,msg:result})
                }
           }
        } catch (error) {
            return res.status(500).json({status:false,msg:error})
        }
    };

    getwithActivateServices=async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const result=await getCache(`getwithActiveServices`)
            if(result!=null){
                return res.status(200).json({status:true,msg:result})
            }
           else{
            const result= await Customer.aggregate([
                {$lookup:{
                    from:'services',
                    localField:'_id',
                    foreignField:'activate',
                    pipeline:[{
                        $project:{
                            __v:0,_id:0,activate:0,stop:0
                        }
                    }],
                    as:"services"
                }}
            ]).project({ __v: 0 ,_id:0});
            if(result){
                await setCache(`getwithActiveServices`,JSON.stringify(result),3600)
                return res.status(200).json({status:true,msg:result})
            }
       }            

        } catch (error) {
            return res.status(500).json({status:false,msg:error})
        }
    }

    deleteCustomer=async (req:Request,res:Response,next:NextFunction)=> {
        const{_id}=req.params
        try {
            await Customer.findByIdAndDelete({_id})
            return res.status(200).json({status:true,msg:"deleted"})
        } catch (error) {
           console.log(error)
           res.status(500).json({error:error}) 
        }
    }

    updateCustomer=async (req:Request,res:Response,next:NextFunction)=> {
        const{_id}=req.params
        const{password,email,username}=req.body
        try {
            await Customer.findByIdAndUpdate(
                {_id},
                {
                    password,email,username
                })
               
            return res.status(200).json({status:true,msg:"updated"})
        } catch (error) {
           console.log(error)
           res.status(500).json({error:error}) 
        }
    }
}
