import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAdminPreferences } from '../../context/AdminPreferencesContext';

const AdminUserProfile = () => {
  const { username, logout } = useAuth();
  const { preferences, loading, savePreferences } = useAdminPreferences();
  const navigate = useNavigate();

  const initials = useMemo(() => {
    const value = (username || 'Authorized User').trim();
    const pieces = value.split(/\s+/).filter(Boolean);
    if (!pieces.length) return 'AU';
    if (pieces.length === 1) return pieces[0].slice(0, 2).toUpperCase();
    return `${pieces[0][0]}${pieces[1][0]}`.toUpperCase();
  }, [username]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleOpenGuestSite = () => {
    window.open('/vista_monte_mar/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      aria-label="User profile"
      className="rounded-lg border border-slate-300 bg-white p-4 shadow-none dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-600 text-sm font-bold text-white">
          {initials}
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Operations User</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{username || 'Property Operations'}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-600 dark:bg-slate-900">
        <p className="text-xs text-slate-600 dark:text-slate-300">Session</p>
        <p className="text-xs font-medium text-slate-800 dark:text-slate-100">Authenticated dashboard access</p>
      </div>

      <button
        type="button"
        onClick={handleOpenGuestSite}
        className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus:ring-offset-slate-900"
      >
        Open Guest Website
      </button>

      <button
        type="button"
        onClick={() => {
          void savePreferences({ darkMode: !preferences.darkMode });
        }}
        disabled={loading}
        className={[
          'mt-3 w-full rounded-lg border px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
          preferences.darkMode
            ? 'border-blue-700 bg-blue-700 text-white hover:bg-blue-800'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
        ].join(' ')}
      >
        {preferences.darkMode ? 'Dark Mode: On' : 'Dark Mode: Off'}
      </button>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-3 w-full rounded-lg border border-blue-700 bg-blue-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        aria-label="Log out of dashboard"
      >
        Log out of dashboard
      </button>
    </section>
  );
};

export default AdminUserProfile;
