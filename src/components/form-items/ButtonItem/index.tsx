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
  const isInfoButton = classValue.includes('btn-info');
  const isGuestButton = classValue.includes('btn-guest');
  const variantClass = isInfoButton
    ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
    : isGuestButton
      ? 'border-[#d6a57d] bg-[#d6a57d] text-white hover:border-[#c58f60] hover:bg-[#c58f60] hover:shadow-lg'
      : 'border-blue-700 bg-blue-700 text-white hover:bg-blue-800 dark:border-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600';
  const focusClass = isGuestButton
    ? 'focus:ring-[#f3c098]'
    : 'focus:ring-blue-300';
  const spinnerClass = isGuestButton
    ? 'border-t-[#d6a57d]'
    : 'border-t-blue-700';

  return (
    <div
      className={`flex ${classValue.replace('btn-secondary', '').replace('btn-info', '').replace('btn-guest', '')}`}
    >
      <button
        type={type}
        className={[
          'flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
          variantClass,
          focusClass,
        ].join(' ')}
        onClick={onClick}
        disabled={saving}
      >
        {children}
      </button>
      {saving && (
        <span
          className={[
            'ml-2 inline-flex h-6 w-6 animate-spin rounded-full border-2 border-slate-300',
            spinnerClass,
          ].join(' ')}
        ></span>
      )}
    </div>
  );
};

export default ButtonItem;
