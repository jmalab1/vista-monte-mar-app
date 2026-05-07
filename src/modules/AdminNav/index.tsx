import ConnectedButtons from '../../components/form-items/ConnectedButtons';
import ConnectedButtonItem from '../../components/form-items/ConnectedButtons/ConntectedButtonItems';
import { FunctionComponent } from 'react';
import { adminNavItems, AdminNavItem } from '../../components/admin/adminNavItems';

type TAdminNav = {
  page: AdminNavItem['key'] | string;
};

const AdminNav: FunctionComponent<TAdminNav> = ({ page }) => {
  return (
    <ConnectedButtons>
      {adminNavItems.map((item) => (
        <ConnectedButtonItem key={item.key} title={item.label} active={page === item.key} url={item.href} />
      ))}
    </ConnectedButtons>
  );
};

export default AdminNav;
