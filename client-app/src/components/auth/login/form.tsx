import { FormEvent, useRef, useState } from "react"
import InputGroup from "../../common/inputGroup"
import InputGroupFormik from "../../common/InputGroupFormik"
import { ILoginModel, LoginError } from "./types";
import { useActions } from "../../../hooks/useActions"
import { validationFields } from "./validation"

import * as Yup from "yup"
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

const RegisterForm = () => {

    const initialValues: ILoginModel = { email: "", password: "" };
    const [state, setState] = useState<ILoginModel>(initialValues)
    const {loginUser}  = useActions();
    const refFormik = useRef<FormikProps<any>>(null);

    const initialErrors : LoginError = {
        email: [],
        password: [],
        error: ""
    }
    const [serverErrors, setServerErrors] = useState<LoginError>(initialErrors);
    
    const handleSubmit = (values: ILoginModel, actions: any) => {
        try{
            loginUser(state);
        }
        catch(ex){
            const serverErrors = ex as LoginError;
            setServerErrors(serverErrors);
            // refFormik.current.setFieldError(serverErrors, );
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationFields} innerRef={refFormik}>
            {(props: FormikProps<ILoginModel>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                    } = props
            return (
                <Form>
                    <InputGroup
                        value={state.email}
                        label="Пошта"
                        field="email"
                        type="text"
                        errors={serverErrors.email}
                        onChange={props.handleChange}
                    />
                    <InputGroup
                        value={state.password}
                        label="Пароль"
                        field="password"
                        type="password"
                        errors={serverErrors.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-primary">Підтвердити</button>
            </Form> )} }
        </Formik>
    );
}

export default RegisterForm;