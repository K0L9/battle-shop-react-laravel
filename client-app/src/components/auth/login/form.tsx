import { useState } from "react"
import InputGroup from "../../common/inputGroup"
import { useActions } from "../../../hooks/useActions"
import { ILoginModel } from "../../../types/auth";

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

    const [model, setModel] = useState<ILoginModel>({ email: "", password: ""} as ILoginModel)
    const initialValues: ILoginModel = { email: "", password: "" };
    const {loginUser}  = useActions();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("MODEL: ", model);
        console.log(loginUser(model));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup
                value={model.email}
                label="Пошта"
                field="email"
                type="text"
                onChange={handleChange}
            />
            <InputGroup
                value={model.password}
                label="Пароль"
                field="password"
                type="text"
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary">Підтвердити</button>
        </form>

    );

}

export default RegisterForm;