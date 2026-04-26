import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import axiosInstance from '../utility/axiosInstance';

interface AuthContextProps {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        try {
          await axiosInstance.get('/api/verify-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (error) {
          setToken(null);
        }
      }
    };

    const interval = setInterval(checkTokenValidity, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/api/login', {
        username,
        password,
      });
      const token = response.data.token;
      setToken(token);
    } catch (error) {
      throw new Error(
        'Login failed. Please check your credentials and try again.'
      );
    }
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
