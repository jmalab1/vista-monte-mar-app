import { FunctionComponent, ChangeEventHandler, ChangeEvent } from 'react';

type TCheckbox = {
  title?: string;
  id: string;
  checked?: boolean;
  readOnly?: boolean;
  onChange?: ChangeEventHandler;
};

const Checkbox: FunctionComponent<TCheckbox> = ({
  title,
  id,
  checked = false,
  readOnly = false,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<Element>) => {
    if (readOnly) return;

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className="form-control sm:col-span-3 flex flex-row items-center">
      <input
        type="checkbox"
        id={id}
        className="checkbox checkbox-secondary"
        checked={checked}
        readOnly={readOnly}
        onChange={handleChange}
      />
      {title && (
        <div className="label">
          <span
            className={`label-text block text-gray-700 text-sm font-bold ${checked ? 'line-through' : ''}`}
          >
            {title}
          </span>
          <span className="label-text-alt"></span>
        </div>
      )}
    </label>
  );
};

export default Checkbox;
