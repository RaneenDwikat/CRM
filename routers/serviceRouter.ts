import express from 'express'
import ServiceControl from '../control/serviceControl'
import { checkValidation } from '../middleware/validation' 
import  auth  from '../middleware/auth' 
import {serviceSchemaValidation} from '../validation/serviceValidation'
import {limiter} from '../middleware/rateLimitter'

const serviceRouter=express.Router()
const control=new ServiceControl()

serviceRouter.post('/add',auth('super'),limiter(60,30),checkValidation(serviceSchemaValidation),control.addService)
serviceRouter.delete('/delete/:_id',auth('super'),limiter(60,30),control.deleteService)

export default serviceRouter