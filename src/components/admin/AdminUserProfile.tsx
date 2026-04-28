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
    <section aria-label="User profile" className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
          {initials}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Authorized User</p>
          <p className="text-sm font-medium text-slate-900">{username || 'Operations'}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
      >
        Log out
      </button>
    </section>
  );
};

export default AdminUserProfile;
