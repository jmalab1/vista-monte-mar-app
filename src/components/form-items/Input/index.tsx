import { ChangeEventHandler, FunctionComponent } from 'react';

type TInput = {
  title: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  type: "password" | "text" | "email" | "tel";
  callback: ChangeEventHandler;
  value: string;
};

const Input: FunctionComponent<TInput> = ({ title, id, placeholder, required, type, callback, value }) => {
  return (
    <label className="form-control sm:col-span-3">
      <div className="label">
        <span className="label-text">{title}</span>
        <span className="label-text-alt"></span>
      </div>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="input input-bordered input-sm"
        required={required}
        onChange={callback}
        value={value}
      />
      <div className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt"></span>
      </div>
    </label>
  );
};

export default Input;
