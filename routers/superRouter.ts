import express from 'express'
import SuperControl from '../control/superControl'
import { checkValidation } from '../middleware/validation' 
import  auth  from '../middleware/auth' 
import {adminSchemaValidation} from '../validation/superValidation'
import {limiter} from '../middleware/rateLimitter'

const superRouter=express.Router()
const control=new SuperControl()

superRouter.post('/login',limiter(60,30),checkValidation(adminSchemaValidation),auth('super'),control.superLogin)


export default superRouter