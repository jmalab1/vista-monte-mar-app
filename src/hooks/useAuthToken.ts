import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuthToken = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthToken must be used within an AuthProvider');
  }
  return context.token;
};
