import { FunctionComponent, ChangeEventHandler, ChangeEvent } from 'react';

type TToggle = {
  title?: string;
  id: string;
  checked?: boolean;
  readOnly?: boolean;
  onChange?: ChangeEventHandler;
};

const Toggle: FunctionComponent<TToggle> = ({
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
        type="checkbox"
        id={id}
        className="toggle toggle-secondary"
        checked={checked}
        readOnly={readOnly}
        onChange={handleChange}
      />
      <div className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt"></span>
      </div>
    </label>
  );
};

export default Toggle;
