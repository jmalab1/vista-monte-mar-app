import { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  meta?: ReactNode;
  profileName?: string;
  profileRole?: string;
  onLogout?: () => void;
};

const AdminTopbar = ({
  title,
  subtitle,
  actions,
  meta,
  profileName,
  profileRole,
  onLogout,
}: Props) => {
  return (
    <header className="rounded-lg border border-slate-300 bg-white p-5 shadow-none sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Dashboard</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
          {meta && <div className="mt-3">{meta}</div>}
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          {actions}
          {(profileName || profileRole || onLogout) && (
            <div className="ml-0 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:ml-2">
              {(profileName || profileRole) && (
                <div className="text-right leading-tight">
                  {profileName && <p className="text-sm font-semibold text-slate-800">{profileName}</p>}
                  {profileRole && <p className="text-xs text-slate-500">{profileRole}</p>}
                </div>
              )}
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  Log out
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
