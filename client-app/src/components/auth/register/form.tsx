import { useState } from "react"
import InputGroup from "../../common/inputGroup"
import { useActions } from "../../../hooks/useActions"
import { IRegisterModel } from "./types"
import { RegisterActionTypes, RegisterError } from "./types"

import {RegisterAction} from "./types"

import * as Yup from 'yup'
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';

interface IRegisterFormProps {
    handleSubmit: (e: React.FormEvent) => void
}
interface OtherProps {
    title?: string;
}

// interface IFormStatus {
//     message: string
//     type: string
// }

// interface IFormStatusProps {
//     [key: string]: IFormStatus
// }

// const formStatusProps: IFormStatusProps = {
//     success: {
//         message: 'Signed up successfully.',
//         type: 'success',
//     },
//     duplicate: {
//         message: 'Email-id already exist. Please use different email-id.',
//         type: 'error',
//     },
//     error: {
//         message: 'Something went wrong. Please try again.',
//         type: 'error',
//     },
// }

const RegisterForm = () => {

    const [state, setState] = useState<IRegisterModel>({ name: "", email: "", password: "", password_confirmation: "" } as IRegisterModel)
    const initialValues: IRegisterModel = { name: "", email: "", password: "", password_confirmation: "" };
    const {registerUser}  = useActions();
    
    const initialErrors : RegisterError = {
        email: [],
        password: [],
        error: ""
    }
    const [serverErrors, setServerErrors] = useState<RegisterError>(initialErrors); 

    const yupValidation = Yup.object().shape({
        email: Yup.string()
            .email()
            .required('Enter valid email'),
        name: Yup.string().required('Please enter your name'),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,20}\S$/
            )
            .required(
                'Please valid password. One uppercase, one lowercase, one special character and no spaces'
            ),
        password_confirmation: Yup.string()
            .required('Confirm your password')
            .test(
                'password match',
                'Password must match',
                function (value) {
                    return this.parent.password === value
                }
            ),
    });
    
    const handleSubmit = (values: IRegisterModel, actions: any) => {
        try{
            registerUser(state);
        }
        catch(ex){
            const serverErrors = ex as RegisterError;
            setServerErrors(serverErrors);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={yupValidation}>
            {(props: FormikProps<IRegisterModel>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                        validateForm,
                    } = props

            return(
                <Form>
                    {/* <InputGroup
                        value={state.name}
                        label="Ім'я"
                        field="name"
                        type="text"
                        errors={errors.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                            setState({
                                ...state,
                                [e.target.name]: e.target.value
                            });
                          }}
                    />
                    <InputGroup
                        value={state.email}
                        label="Пошта"
                        field="email"
                        type="email"
                        errors={errors.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                            setState({
                                ...state,
                                [e.target.name]: e.target.value
                            });
                          }}
                    />
                    <InputGroup
                        value={state.password}
                        label="Пароль"
                        field="password"
                        type="password"
                        errors={errors.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                            setState({
                                ...state,
                                [e.target.name]: e.target.value
                            });
                          }}
                    />
                    <InputGroup
                        value={state.password_confirmation}
                        label="Підтвердження паролю"
                        field="password_confirmation"
                        type="password"
                        errors={errors.password_confirmation}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                            setState({
                                ...state,
                                [e.target.name]: e.target.value
                            });
                          }}
                    /> */}
                    <button type="submit" className="btn btn-primary">Підтвердити</button>
                </Form>
            )}}
        </Formik>
    );

}

export default RegisterForm;