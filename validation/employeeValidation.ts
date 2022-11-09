
import * as Yup from 'yup';

export const  employeeSchemaValidation= Yup.object().shape({
    email:Yup.string().email().required('email required'),
    password:Yup.string().min(8,'your password is too short').required('password required'),
    username:Yup.string().required('username required'),
});

