import express from 'express'
import CustumerControl from '../control/customerControl'
import { checkValidation } from '../middleware/validation' 
import  auth  from '../middleware/auth' 
import {customerSchemaValidation} from '../validation/customerValidation'
import {limiter} from '../middleware/rateLimitter'


const customerRouter=express.Router()
const control=new CustumerControl()


// to add new customer
customerRouter.post('/add',limiter(60,30),checkValidation(customerSchemaValidation),auth('employee'),control.addCustomer)
// to add service to spacific customer
customerRouter.put("/addservice/:_id",limiter(60,30),auth('employee'),control.addService)
// to delete spacific service for a spacific customer
customerRouter.put("/deleteservice/:_id",limiter(60,30),auth('employee'),control.deleteService)
// get services for a all customers
customerRouter.get('/getwithservices/:_id',limiter(60,30),control.getwithServices)
//get all  customers with their active services.
customerRouter.get('/getwithactivateservices',limiter(60,30),control.getwithActivateServices)
// delete customer
customerRouter.delete('/delete/:_id',limiter(60,30),auth('employee'),control.deleteCustomer)
// update customer
customerRouter.put("/update/:_id",limiter(60,30),auth('employee'),control.updateCustomer)




export default customerRouter