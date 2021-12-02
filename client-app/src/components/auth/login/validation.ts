import * as Yup from "yup";

export const validationFields = () => {
    return Yup.object().shape({
        email: Yup.string()
            .email()
            .required('Enter valid email'),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,20}\S$/
            )
            .required(
                'Please valid password'
            ),
});   
}