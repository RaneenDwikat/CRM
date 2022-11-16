import express from 'express'
import CustumerControl from '../control/customerControl'
import { checkValidation } from '../middleware/validation' 
import  auth  from '../middleware/auth' 
import {customerSchemaValidation} from '../validation/customerValidation'
import {customerServiceSchemaValidation} from '../validation/customerServiceValidation'
import {limiter} from '../middleware/rateLimitter'


const customerRouter=express.Router()
const control=new CustumerControl()


// to add new customer
customerRouter.post('/add',auth('employee'),limiter(60,30),checkValidation(customerSchemaValidation),control.addCustomer)
// to add service to spacific customer
customerRouter.post("/addservice",auth('employee'),limiter(60,30),checkValidation(customerSchemaValidation),control.addService)
// to delete spacific service for a spacific customer
customerRouter.delete("/deleteservice/:customer/:service",auth('employee'),limiter(60,30),control.deleteService)
// stop spacific service for spacific customer
customerRouter.put("/stopservice",auth('employee'),limiter(60,30),control.stopService)
// activate spacific service for spacific customer
customerRouter.put("/activateservice",auth('employee'),limiter(60,30),control.activateService)
// get all services for spacific customer
customerRouter.get('/getwithservices/:_id',limiter(60,30),control.getwithServices)
//get all  customers with their active services.
customerRouter.get('/getwithactivateservices',limiter(60,30),control.getWithActivateServices)
// delete customer
customerRouter.delete('/delete/:_id',auth('employee'),limiter(60,30),control.deleteCustomer)
// update customer
customerRouter.put("/update/:_id",auth('employee'),limiter(60,30),control.updateCustomer)




export default customerRouter