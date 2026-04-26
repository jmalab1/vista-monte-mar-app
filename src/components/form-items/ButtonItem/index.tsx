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
  return (
    <div className={`flex ${classValue}`}>
      <button
        type={type}
        className={`btn btn-sm text-base-100 flex-1`}
        onClick={onClick}
      >
        {children}
      </button>
      {saving && (
        <span className="loading loading-spinner loading-md bg-gray-600 ml-2 flex-2"></span>
      )}
    </div>
  );
};

export default ButtonItem;
