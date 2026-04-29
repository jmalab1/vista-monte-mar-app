import { ChangeEventHandler, useState, useEffect } from 'react';

type TNumberInput = {
  title?: string;
  id: string;
  onChange?: ChangeEventHandler;
  value: string;
};

const NumberInput: React.FC<TNumberInput> = ({
  title,
  id,
  value,
  onChange,
}) => {
  const [cValue, setcValue] = useState<number>(parseInt(value, 10) || 0);

  // Synchronize internal state with the value prop
  useEffect(() => {
    setcValue(parseInt(value, 10) || 0);
  }, [value]);

  const handleIncrease = () => {
    const newValue = cValue + 1;
    setcValue(newValue);
    if (onChange) {
      // Trigger onChange with a fake event
      onChange({
        target: { value: newValue.toString(), id } as HTMLInputElement,
      } as React.FocusEvent<HTMLInputElement>);
    }
  };

  const handleDecrease = () => {
    const newValue = cValue > 0 ? cValue - 1 : 0;
    setcValue(newValue);
    if (onChange) {
      // Trigger onChange with a fake event
      onChange({
        target: { value: newValue.toString(), id } as HTMLInputElement,
      } as React.FocusEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {title && (
        <div className="label">
          <span className="label-text block text-gray-700 text-sm font-bold">
            {title}
          </span>
          <span className="label-text-alt"></span>
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        <button
          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-40"
          onClick={handleDecrease}
          disabled={cValue === 0}
        >
          -
        </button>
        <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-center text-sm font-semibold text-slate-800">
          {cValue}
        </span>
        <button
          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
