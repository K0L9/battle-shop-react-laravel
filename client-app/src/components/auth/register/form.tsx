import { useState } from "react"
import InputGroup from "../../common/inputGroup"
import { useActions } from "../../../hooks/useActions"
import { IRegisterModel } from "../../../types/register"

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
// interface IRegisterPage {
//     name: string,
//     email: string,
//     password: string,
//     passwordConf: string
// }

interface OtherProps {
    title?: string;
}

const RegisterForm = () => {

    const [model, setModel] = useState<IRegisterModel>({ name: "", email: "", password: "", password_confirmation: "" } as IRegisterModel)
    const initialValues: IRegisterModel = { name: "", email: "", password: "", password_confirmation: "" };
    const {registerUser}  = useActions();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("MODEL: ", model);
        registerUser(model);
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
                value={model.name}
                label="Ім'я"
                field="name"
                type="text"
                onChange={handleChange}
            />
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
            <InputGroup
                value={model.password_confirmation}
                label="Підтвердження паролю"
                field="password_confirmation"
                type="text"
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary">Підтвердити</button>
        </form>

    );

}

export default RegisterForm;