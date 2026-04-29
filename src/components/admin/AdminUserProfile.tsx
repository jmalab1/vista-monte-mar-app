import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminUserProfile = () => {
  const { username, logout } = useAuth();
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

  return (
    <section
      aria-label="User profile"
      className="rounded-lg border border-slate-300 bg-white p-4 shadow-none"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            {initials}
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Operations User</p>
            <p className="text-sm font-semibold text-slate-900">{username || 'Property Operations'}</p>
          </div>
        </div>
        <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
          Online
        </span>
      </div>

      <div className="mt-4 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2">
        <p className="text-xs text-slate-600">Session</p>
        <p className="text-xs font-medium text-slate-800">Authenticated dashboard access</p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 w-full rounded-lg border border-blue-700 bg-blue-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        aria-label="Log out of dashboard"
      >
        Log out of dashboard
      </button>
      <p className="mt-2 text-center text-[11px] text-slate-500">Ends your current secure session immediately.</p>
    </section>
  );
};

export default AdminUserProfile;
