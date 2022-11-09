import { redis } from "../utils/redis/connectRedis";


export const getCache=async(key:string)=>{
  const result= await redis.GET(key);
  if(result){
    return JSON.parse(result)
  }
  return
   
}
export const setCache=async(key:string,data:string, expired: number)=>{
 
    await redis.setEx(key, expired, data);
    return data;
}

