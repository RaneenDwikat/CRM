
// import * as yup from 'yup';

// export const  adminSchemaValidation= yup.object().shape({
//     email:yup.string().email().required(),
//     password:yup.string().min(8,'your password is too short').required('password required'),
//     last_login:yup.date()
//     .transform(function (value, originalValue) {
//       if (this.isType(value)) {
//         return value;
//       }
//       const result = parse(originalValue, "dd.MM.yyyy", new Date());
//       return result;
//     })
//     .typeError("please enter a valid date")
//     .required()
//     .min("1969-11-13", "Date is too early")
// });









import * as Yup from 'yup';

export const  adminSchemaValidation= Yup.object().shape({
    email:Yup.string().email().required(),
    password:Yup.string().min(8,'your password is too short').required('password required'),
    // last_login:Yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr).required('Mandatory field message')
});


