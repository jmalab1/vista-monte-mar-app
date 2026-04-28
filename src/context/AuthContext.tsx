import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import axiosInstance from '../utility/axiosInstance';

const safeGetStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSetStorageItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // no-op
  }
};

const safeRemoveStorageItem = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // no-op
  }
};

interface AuthContextProps {
  token: string | null;
  username: string | null;
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
  const [token, setToken] = useState<string | null>(safeGetStorageItem('token'));
  const [username, setUsername] = useState<string | null>(safeGetStorageItem('username'));

  useEffect(() => {
    if (token) {
      safeSetStorageItem('token', token);
    } else {
      safeRemoveStorageItem('token');
      setUsername(null);
    }
  }, [token]);

  useEffect(() => {
    if (username) {
      safeSetStorageItem('username', username);
    } else {
      safeRemoveStorageItem('username');
    }
  }, [username]);

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
      setUsername(username);
    } catch (error) {
      throw new Error(
        'Login failed. Please check your credentials and try again.'
      );
    }
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated }}>
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
