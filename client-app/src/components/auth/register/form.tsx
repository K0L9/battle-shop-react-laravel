import { useState } from "react"
import InputGroup from "../../common/inputGroup"
import { useActions } from "../../../hooks/useActions"

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
interface IRegisterPage {
    // surname: string,
    name: string,
    email: string,
    password: string,
    passwordConf: string
}

interface OtherProps {
    title?: string;
}

const RegisterForm = () => {

    const [model, setModel] = useState<IRegisterPage>({ name: "", email: "", password: "", passwordConf: "" } as IRegisterPage)
    const initialValues: IRegisterPage = { name: "", email: "", password: "", passwordConf: "" };

    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("MODEL: ", model)
        // useActions().loginUser();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* <InputGroup
                value={model.surname}
                label="Прізвище"
                field="surname"
                type="text"
                onChange={handleChange}
            /> */}
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
                field="passord"
                type="text"
                onChange={handleChange}
            />
            <InputGroup
                value={model.passwordConf}
                label="Підтвердження паролю"
                field="passordConf"
                type="text"
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary">Підтвердити</button>
        </form>

    );

}

export default RegisterForm;