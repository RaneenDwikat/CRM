import express from 'express'
import SuperControl from '../control/superControl'
import { checkValidation } from '../middleware/validation' 
import  auth  from '../middleware/auth' 
import {adminSchemaValidation} from '../validation/superValidation'
import {limiter} from '../middleware/rateLimitter'

const superRouter=express.Router()
const control=new SuperControl()

superRouter.post('/login',auth('super'),limiter(60,30),checkValidation(adminSchemaValidation),control.superLogin)


export default superRouter