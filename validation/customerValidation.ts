
import * as Yup from 'yup';

export const  customerSchemaValidation= Yup.object().shape({
    email:Yup.string().email().required(),
    password:Yup.string().min(8,'your password is too short').required('password required'),
    username:Yup.string().required(),
});

