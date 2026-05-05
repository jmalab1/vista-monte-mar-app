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
    <label className="form-control sm:col-span-3 flex flex-row items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className="peer sr-only"
        checked={checked}
        readOnly={readOnly}
        onChange={handleChange}
      />
      <span
        aria-hidden="true"
        className={[
          'admin-checkbox inline-flex h-5 w-5 items-center justify-center rounded border transition-colors duration-200',
          checked
            ? 'border-blue-700 bg-blue-600'
            : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800',
        ].join(' ')}
      >
        <svg
          viewBox="0 0 16 16"
          className={[
            'h-3.5 w-3.5 transition-opacity duration-150',
            checked ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 8.25L6.5 11.25L12.5 5.25"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
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
