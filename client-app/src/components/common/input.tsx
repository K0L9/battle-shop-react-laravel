export interface IBaseInputProps {
    value: string;
    field: string;
    type?: "text" | "number" | "password" | "email";
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, field, onChange, type="text" }: IBaseInputProps) => {
    return (
        <input onChange={onChange} value={value} name={field} id={field} type={type} className="form-control"/>
    )
}

export default Input;