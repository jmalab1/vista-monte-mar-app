import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from '../utility/axiosInstance';
import { useAuth } from './AuthContext';

export type HistoryPeriod = 'day' | 'month' | 'year';

type AdminPreferences = {
  historyPageSize: number;
  historyPeriod: HistoryPeriod;
  darkMode: boolean;
};

type AdminPreferencesContextType = {
  preferences: AdminPreferences;
  loading: boolean;
  savePreferences: (updates: Partial<AdminPreferences>) => Promise<void>;
};

const DEFAULT_PREFERENCES: AdminPreferences = {
  historyPageSize: 10,
  historyPeriod: 'day',
  darkMode: false,
};

const AdminPreferencesContext = createContext<AdminPreferencesContextType | undefined>(undefined);

export const AdminPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [preferences, setPreferences] = useState<AdminPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setPreferences(DEFAULT_PREFERENCES);
      return;
    }

    setLoading(true);
    axios
      .get<AdminPreferences>('/api/admin-preferences')
      .then((response) => {
        setPreferences({
          historyPageSize: response.data.historyPageSize || 10,
          historyPeriod: (response.data.historyPeriod as HistoryPeriod) || 'day',
          darkMode: Boolean(response.data.darkMode),
        });
      })
      .catch(() => {
        setPreferences(DEFAULT_PREFERENCES);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAuthenticated]);

  useEffect(() => {
    document.body.classList.toggle('admin-dark-mode', preferences.darkMode);
    document.documentElement.classList.toggle('dark', preferences.darkMode);
    return () => {
      document.body.classList.remove('admin-dark-mode');
      document.documentElement.classList.remove('dark');
    };
  }, [preferences.darkMode]);

  const savePreferences = async (updates: Partial<AdminPreferences>) => {
    const next = { ...preferences, ...updates };
    setPreferences(next);
    try {
      const response = await axios.put<AdminPreferences>('/api/admin-preferences', updates);
      setPreferences({
        historyPageSize: response.data.historyPageSize || 10,
        historyPeriod: (response.data.historyPeriod as HistoryPeriod) || 'day',
        darkMode: Boolean(response.data.darkMode),
      });
    } catch {
      setPreferences((prev) => ({ ...prev }));
    }
  };

  const value = useMemo(
    () => ({ preferences, loading, savePreferences }),
    [preferences, loading]
  );

  return <AdminPreferencesContext.Provider value={value}>{children}</AdminPreferencesContext.Provider>;
};

export const useAdminPreferences = (): AdminPreferencesContextType => {
  const context = useContext(AdminPreferencesContext);
  if (!context) {
    throw new Error('useAdminPreferences must be used within AdminPreferencesProvider');
  }
  return context;
};
