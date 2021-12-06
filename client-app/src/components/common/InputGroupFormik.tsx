import Input, { IBaseInputProps } from "./input";

export interface IBaseInputGroupProps extends IBaseInputProps {
  label: string;
  errors: Array<string>;
}

const InputGroupFormik = ({
  value,
  field,
  onChange,
  label,
  errors,
  type = "text",
  ...props
}: IBaseInputGroupProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <Input value={value} onChange={onChange} field={field} type={type} />
      {errors && errors.map((text, key) => {
          return (
            <span className="text-danger" key={key}>{text}</span>
          );
    })}
    </div>
  );
};

export default InputGroupFormik;
