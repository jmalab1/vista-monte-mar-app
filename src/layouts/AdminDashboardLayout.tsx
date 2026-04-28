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
    <div className="min-h-screen bg-slate-50 px-4 py-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <AdminSidebar activeKey={activeNavKey} footer={footer} />
        <main className="space-y-4 lg:space-y-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
