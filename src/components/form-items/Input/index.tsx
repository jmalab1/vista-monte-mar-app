import {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
} from 'react';

type TInput = {
  title?: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  type: 'password' | 'text' | 'email' | 'tel' | 'number';
  onChange?: ChangeEventHandler;
  value: string;
  readOnly?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const Input: FunctionComponent<TInput> = ({
  title,
  id,
  placeholder,
  required,
  type,
  onChange,
  value,
  readOnly,
  onBlur,
}) => {
  return (
    <label className="form-control sm:col-span-3">
      {title && (
        <div className="label">
          <span className="label-text block text-gray-700 text-sm font-bold">
            {title}
          </span>
          <span className="label-text-alt"></span>
        </div>
      )}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="input input-bordered input-sm shadow-inner"
        required={required}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
        onBlur={onBlur}
      />
      <div className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt"></span>
      </div>
    </label>
  );
};

export default Input;
