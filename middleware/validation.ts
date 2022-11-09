import Yup from 'yup'
import { Request,Response,NextFunction } from 'express'

export  function checkValidation(schema:Yup.AnySchema) {
    return async (req:Request,res:Response,next:NextFunction)=> {
        try {
           const validate= await schema.validate(req.body)
            // req.body=validate
            next()
        } catch (error) {
            return res.status(500).json({error:error})
        }
    }
}