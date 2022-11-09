
import {redis} from '../utils/redis/connectRedis'


import { NextFunction,Request,Response } from 'express'


 export const  limiter=(timestamp:number,limit:number)=>
  async (req:Request,res:Response,next:NextFunction ) =>
 {           

            const requests= await redis.incr(req.ip)
            if(requests ===1){
                await redis.expire(req.ip,timestamp)
            }
            if(requests>limit){
                return res.status(429 ).json({msg:"too many requests"})
            }else{
                next()
            }
        }


