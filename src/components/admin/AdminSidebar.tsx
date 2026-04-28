import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { adminNavItems, AdminNavItem } from './adminNavItems';

type Props = {
  activeKey?: AdminNavItem['key'];
  brand?: string;
  footer?: ReactNode;
};

const AdminSidebar = ({ activeKey, brand = 'Vista Monte Mar', footer }: Props) => {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Admin Suite</p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">{brand}</h2>
      </div>

      <nav aria-label="Admin navigation" className="space-y-1.5">
        {adminNavItems.map((item) => {
          const fallbackActive = activeKey === item.key;

          return (
            <NavLink
              key={item.key}
              to={item.href}
              className={({ isActive }) => {
                const active = isActive || fallbackActive;
                return [
                  'block rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                ].join(' ');
              }}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {footer && <div className="mt-6 border-t border-slate-100 pt-4">{footer}</div>}
    </aside>
  );
};

export default AdminSidebar;
