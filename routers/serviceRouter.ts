import express from 'express'
import ServiceControl from '../control/serviceControl'
import { checkValidation } from '../middleware/validation' 
import  auth  from '../middleware/auth' 
import {serviceSchemaValidation} from '../validation/serviceValidation'
import {limiter} from '../middleware/rateLimitter'

const serviceRouter=express.Router()
const control=new ServiceControl()

serviceRouter.post('/add',limiter(60,30),checkValidation(serviceSchemaValidation),auth('super'),control.addService)
serviceRouter.delete('/delete/:_id',limiter(60,30),auth('super'),control.deleteService)
serviceRouter.put('/stopservice/:_id',auth('employee'),control.stopService)
serviceRouter.put('/updateservice/:_id',auth('employee'),control.updateService)
export default serviceRouter