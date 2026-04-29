import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { AdminPreferencesProvider } from './context/AdminPreferencesContext';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <AdminPreferencesProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AdminPreferencesProvider>
        </AuthProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
