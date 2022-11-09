import * as Yup from 'yup';

export const  serviceSchemaValidation= Yup.object().shape({
    title:Yup.string().max(50).required(),
    description:Yup.string().required()
})