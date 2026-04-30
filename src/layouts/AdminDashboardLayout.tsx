import { ReactNode } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminUserProfile from '../components/admin/AdminUserProfile';
import { AdminNavItem } from '../components/admin/adminNavItems';

type Props = {
  children: ReactNode;
  activeNavKey?: AdminNavItem['key'];
  sidebarFooter?: ReactNode;
};

const AdminDashboardLayout = ({ children, activeNavKey, sidebarFooter }: Props) => {
  const footer = sidebarFooter ?? <AdminUserProfile />;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="grid w-full gap-4 p-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-4 lg:p-6">
        <AdminSidebar activeKey={activeNavKey} footer={footer} />
        <main className="min-w-0 space-y-4 border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900 lg:space-y-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
