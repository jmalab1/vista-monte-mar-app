export type AdminNavItem = {
  key:
    | 'manage_inventory'
    | 'manage_checklist'
    | 'inventory'
    | 'checklist'
    | 'history'
    | 'audit'
    | 'email_history';
  label: string;
  href: string;
};

export const adminNavItems: AdminNavItem[] = [
  { key: 'manage_inventory', label: 'Manage Inventory', href: '/manage_inventory' },
  { key: 'manage_checklist', label: 'Manage Checklist', href: '/manage_checklist' },
  { key: 'inventory', label: 'Inventory', href: '/inventory' },
  { key: 'checklist', label: 'Checklist', href: '/checklist' },
  { key: 'history', label: 'Traffic History', href: '/history' },
  { key: 'audit', label: 'Audit Log', href: '/audit' },
  { key: 'email_history', label: 'Email History', href: '/email-history' },
];
