import * as Yup from 'yup';

export const  customerServiceSchemaValidation= Yup.object().shape({
    status:Yup.string().oneOf(["active","stopped"]).required(),
    service:Yup.string().min(24).max(24).required("service id required"),
    customer:Yup.string().min(24).max(24).required("customer id required"),
});
