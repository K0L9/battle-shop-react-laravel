import Input, { IBaseInputProps } from "./input";

export interface IBaseInputGroupProps extends IBaseInputProps {
    label: string;
}

const InputGroup = ({ value, field, onChange, label, type }: IBaseInputGroupProps) => {
    return (
        <div className="mb-3">
          <label htmlFor={field} className="form-label">{label}</label>
          <Input value={value} onChange={onChange} field={field} type={type} />
        </div>
    )
}

export default InputGroup;