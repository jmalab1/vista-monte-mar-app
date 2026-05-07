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
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        onClick={() => {
          if (readOnly) return;
          handleChange({
            target: { checked: !checked, type: 'checkbox', id } as HTMLInputElement,
          } as React.ChangeEvent<Element>);
        }}
        className={[
          'admin-toggle relative inline-flex h-6 w-11 cursor-pointer rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300',
          checked
            ? 'border-blue-700 bg-blue-600'
            : 'border-slate-300 bg-slate-200',
        ].join(' ')}
      >
        <span
          className={[
            'admin-toggle-thumb absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          ].join(' ')}
        />
      </button>
      <div className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt"></span>
      </div>
    </label>
  );
};

export default Toggle;
