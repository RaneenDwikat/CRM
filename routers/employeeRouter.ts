import express from 'express'
import EmployeeControl from '../control/employeeControl'
import { checkValidation } from '../middleware/validation' 
import  auth  from '../middleware/auth' 
import {employeeSchemaValidation} from '../validation/employeeValidation'
import {limiter} from '../middleware/rateLimitter'

const emplyeeRouter=express.Router()
const control=new EmployeeControl()

emplyeeRouter.post('/add',limiter(60,30),checkValidation(employeeSchemaValidation),auth('super'),control.addEmployee)


export default emplyeeRouter