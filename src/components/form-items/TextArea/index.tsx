import {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
} from 'react';

type TTextArea = {
  title: string;
  id: string;
  placeholder: string;
  onChange: ChangeEventHandler;
  value: string;
  required?: boolean;
  rows?: number;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
};

const TextArea: FunctionComponent<TTextArea> = ({
  title,
  id,
  placeholder,
  onChange,
  value,
  onBlur,
  required = false,
  rows = 2,
}) => {
  return (
    <label className="form-control col-span-full">
      <div className="label">
        <span className="label-text block text-gray-700 text-sm font-bold">
          {title}
        </span>
        <span className="label-text-alt"></span>
      </div>
      <textarea
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none"
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        rows={rows}
        onBlur={onBlur}
      />
      <div className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt"></span>
      </div>
    </label>
  );
};

export default TextArea;
