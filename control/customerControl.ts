import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { setCache, getCache } from "../middleware/cache";
import Customer from "../model/customer";
import customerService from "../model/customerService";
import CustomerService from "../model/customerService";
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
        const { service,customer} = req.body;
        try {
            const result=await new CustomerService({service,customer,status:"active"}).save();
            return res.status(200).json({ status: true, msg: "added" });
        } catch (error) {
            return res.status(500).json({ status: false, msg: error });
        }
    };
    deleteService = async (req: Request, res: Response, next: NextFunction) => {
        const { service,customer} = req.params;

        try {
           const result=await CustomerService.findOneAndDelete({service,customer});
            return res.status(200).json({ status: true, msg: "deleted"});
        } catch (error) {
            return res.status(500).json({ status: false, msg: error });
        }
    };
    stopService = async (req: Request, res: Response, next: NextFunction) => {
        const { service,customer} = req.body;

        try {
           const result=await CustomerService.findOneAndUpdate({service,customer},{status:"stopped"});
            return res.status(200).json({ status: true, msg: "stopped"});
        } catch (error) {
            return res.status(500).json({ status: false, msg: error });
        }
    };
    activateService = async (req: Request, res: Response, next: NextFunction) => {
        const { service,customer} = req.body;

        try {
           const result=await CustomerService.findOneAndUpdate({service,customer},{status:"activated"});
            return res.status(200).json({ status: true, msg: "activated"});
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
            const result= await Customer.aggregate([
               {$match:{_id:  new mongoose.Types.ObjectId(_id)}},
             {$lookup:{
                from:'customerservices',
                foreignField:'customer',
                localField:'_id',
                pipeline:[
                    {
                    $lookup:{
                        from:'services',
                        foreignField:'_id',
                        localField:'service',
                        pipeline:[{
                            $project:{createdAt:0,updatedAt:0,__v:0,_id:0}
                        }],
                        as:'services'
                    }},{
                        $project:{createdAt:0,updatedAt:0,__v:0,_id:0,service:0,customer:0}
                    },{
                        $group:{_id:"$status",
                        services:{
                                $push:{ 
                                title:'$services.title',
                                description:'$services.description'
                            }
                        }
                    }
                    }],
                as:'customerService'
             }}
                
            ]).project({createdAt:0,updatedAt:0,customer:0,service:0,__v:0})
                if(result){
                    await setCache(`get_${_id}_withServices`,JSON.stringify(result),3600)
                    return res.status(200).json({status:true,msg:result})
                }
           }
        } catch (error) {
            return res.status(500).json({status:false,msg:error})
        }
    };

    getWithActivateServices=async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const result=await getCache(`getwithActiveServices`)
            if(result!=null){
                return res.status(200).json({status:true,msg:result})
            }
           else{
            // const result= await customerService.aggregate([
            //     {
            //         $match:{status:'active'}
            //     },
            //     {$lookup:{
            //         from:"services",
            //         localField:"service",
            //         pipeline:[
            //             {$project:{_id:0,last_login:0,createdAt:0,updatedAt:0,__v:0,password:0}},
                      
            //         ],
            //         foreignField:"_id",
            //         as:"services"
            //     }},
            //     {$lookup:{
            //         from:'customers',
            //         localField:'customer',
            //         foreignField:'_id',
            //         as:'customers'
            //     }},
            //     {$group:{_id:"$customers.username",
               
            //     services:{
                    
            //         $push:{
            //             title:'$services.title',
            //             description:'$services.description',
            //             status:'$status'
            //         }
            //     }
            //     },
            // },
                
            // ]).project({createdAt:0,updatedAt:0,customer:0,service:0,__v:0})

            const result= await Customer.aggregate([
              {$lookup:{
                 from:'customerservices',
                 foreignField:'customer',
                 localField:'_id',
                 pipeline:[
                  {$match:{status:"active"}},
                     {
                     $lookup:{
                         from:'services',
                         foreignField:'_id',
                         localField:'service',
                         pipeline:[{
                             $project:{createdAt:0,updatedAt:0,__v:0,_id:0}
                         }],
                         as:'services'
                     }},{
                         $project:{createdAt:0,updatedAt:0,__v:0,_id:0,service:0,customer:0}
                     },{
                        $group:{_id:"$status",services:{
                            $push:{
                                title:'$services.title',
                                description:'$services.description'
                            }
                        }
                    }
                     },
                    {
                        $project:{_id:0}
                    }],
                 as:'customerService'
              }}
                 
             ]).project({createdAt:0,updatedAt:0,customer:0,service:0,__v:0})
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
