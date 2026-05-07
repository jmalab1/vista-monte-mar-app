// ToastContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import Toast from '../components/Toast';

// Define the types for the toast message and type
interface Toast {
  message: string;
  type: 'success' | 'error' | 'info'; // You can add more types if needed
}

// Define the context type
interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

// Create the Toast Context with a default value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook to use the Toast context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// ToastProvider to manage global toast state
interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null); // Hide toast after 3 seconds
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};
