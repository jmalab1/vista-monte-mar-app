import axios from 'axios';

const axiosInstance = axios.create();
const AUTH_EXPIRED_EVENT = 'auth:expired';
const AUTH_LOGOUT_REASON_KEY = 'auth_logout_reason';

const notifyAuthExpired = (message: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(AUTH_LOGOUT_REASON_KEY, message);
    window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT, { detail: { message } }));
  } catch {
    // no-op
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = String(error?.config?.url || '');
    const hasToken = typeof window !== 'undefined' && Boolean(localStorage.getItem('token'));
    const isLoginRequest = requestUrl.includes('/api/login');

    if ((status === 401 || status === 403) && hasToken && !isLoginRequest) {
      const serverMessage = error?.response?.data?.message;
      const reason =
        typeof serverMessage === 'string' && serverMessage.trim().length > 0
          ? serverMessage
          : 'Your session expired or was revoked. Please sign in again.';
      notifyAuthExpired(reason);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
