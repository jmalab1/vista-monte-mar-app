// Toast.tsx
import React from 'react';

// Define the Toast component props type
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  // Determine the background color based on the toast type
  const bgColor =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
        ? 'bg-red-500'
        : 'bg-blue-500';

  return (
    <div className={`toast toast-end ${bgColor} text-white m-4`}>
      <div className="flex items-center">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
