import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
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
  keepSessionAlive: () => void;
  showSessionExpiryWarning: boolean;
  sessionExpiryWarningEndsAt: number | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const AUTH_EXPIRED_EVENT = 'auth:expired';
const IDLE_TIMEOUT_MS = 20 * 60 * 1000;
const WARNING_DURATION_MS = 10 * 60 * 1000;
const WARNING_TIMEOUT_MS = IDLE_TIMEOUT_MS - WARNING_DURATION_MS;
const ACTIVITY_EVENTS = [
  'mousedown',
  'click',
  'keydown',
  'touchstart',
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(safeGetStorageItem('token'));
  const [username, setUsername] = useState<string | null>(safeGetStorageItem('username'));
  const [showSessionExpiryWarning, setShowSessionExpiryWarning] = useState(false);
  const [sessionExpiryWarningEndsAt, setSessionExpiryWarningEndsAt] = useState<number | null>(null);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tokenRef = useRef<string | null>(token);
  const showWarningRef = useRef<boolean>(showSessionExpiryWarning);
  const isAuthenticated = token !== null;

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  useEffect(() => {
    showWarningRef.current = showSessionExpiryWarning;
  }, [showSessionExpiryWarning]);

  const clearIdleTimer = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  };

  const clearWarningTimer = () => {
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
  };

  const logout = useCallback(() => {
    clearIdleTimer();
    clearWarningTimer();
    setShowSessionExpiryWarning(false);
    setSessionExpiryWarningEndsAt(null);
    setToken(null);
    setUsername(null);
  }, []);

  const resetIdleTimer = () => {
    clearIdleTimer();
    clearWarningTimer();
    setShowSessionExpiryWarning(false);
    setSessionExpiryWarningEndsAt(null);
    if (tokenRef.current) {
      warningTimeoutRef.current = window.setTimeout(() => {
        setShowSessionExpiryWarning(true);
        setSessionExpiryWarningEndsAt(Date.now() + WARNING_DURATION_MS);
      }, WARNING_TIMEOUT_MS);
      idleTimeoutRef.current = window.setTimeout(() => {
        logout();
      }, IDLE_TIMEOUT_MS);
    }
  };

  const keepSessionAlive = useCallback(() => {
    if (!tokenRef.current) {
      return;
    }
    resetIdleTimer();
  }, [resetIdleTimer]);

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
    const handleAuthExpired = () => {
      if (tokenRef.current) {
        logout();
      }
    };

    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    };
  }, [logout]);

  useEffect(() => {
    const handleUserActivity = () => {
      if (showWarningRef.current) {
        return;
      }
      resetIdleTimer();
    };

    if (!isAuthenticated) {
      clearIdleTimer();
      clearWarningTimer();
      setShowSessionExpiryWarning(false);
      setSessionExpiryWarningEndsAt(null);
      return;
    }

    resetIdleTimer();
    ACTIVITY_EVENTS.forEach((eventName) =>
      window.addEventListener(eventName, handleUserActivity)
    );

    return () => {
      clearIdleTimer();
      clearWarningTimer();
      ACTIVITY_EVENTS.forEach((eventName) =>
        window.removeEventListener(eventName, handleUserActivity)
      );
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        const tokenAtRequestStart = token;
        try {
          const response = await axiosInstance.get('/api/verify-token', {
            headers: { Authorization: `Bearer ${tokenAtRequestStart}` },
          });

          // Ignore stale responses after logout or token rotation.
          if (tokenRef.current !== tokenAtRequestStart) {
            return;
          }

          const refreshedToken = response.data?.token;
          if (
            typeof refreshedToken === 'string' &&
            refreshedToken !== tokenAtRequestStart
          ) {
            setToken(refreshedToken);
          }
        } catch (error) {
          if (tokenRef.current !== tokenAtRequestStart) {
            return;
          }

          logout();
        }
      }
    };

    const interval = setInterval(checkTokenValidity, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [token, logout]);

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

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        login,
        logout,
        keepSessionAlive,
        showSessionExpiryWarning,
        sessionExpiryWarningEndsAt,
        isAuthenticated,
      }}
    >
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
