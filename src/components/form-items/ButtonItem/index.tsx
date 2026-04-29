import React, { FunctionComponent } from 'react';

type TButton = {
  classValue?: string;
  type: 'submit' | 'button';
  onClick?: () => void;
  saving?: boolean;
  children: React.ReactNode;
};

const ButtonItem: FunctionComponent<TButton> = ({
  classValue = 'btn-secondary',
  type,
  onClick,
  saving,
  children,
}) => {
  const variantClass = classValue.includes('btn-info')
    ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
    : 'border-blue-700 bg-blue-700 text-white hover:bg-blue-800';

  return (
    <div className={`flex ${classValue.replace('btn-secondary', '').replace('btn-info', '')}`}>
      <button
        type={type}
        className={[
          'flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60',
          variantClass,
        ].join(' ')}
        onClick={onClick}
        disabled={saving}
      >
        {children}
      </button>
      {saving && (
        <span className="ml-2 inline-flex h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-blue-700"></span>
      )}
    </div>
  );
};

export default ButtonItem;
