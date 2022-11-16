import express from 'express'
import EmployeeControl from '../control/employeeControl'
import { checkValidation } from '../middleware/validation' 
import  auth  from '../middleware/auth' 
import {employeeSchemaValidation} from '../validation/employeeValidation'
import {limiter} from '../middleware/rateLimitter'

const emplyeeRouter=express.Router()
const control=new EmployeeControl()

emplyeeRouter.post('/add',auth('super'),limiter(60,30),checkValidation(employeeSchemaValidation),control.addEmployee)


export default emplyeeRouter