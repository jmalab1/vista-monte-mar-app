import ConnectedButtons from '../../components/form-items/ConnectedButtons';
import ConnectedButtonItem from '../../components/form-items/ConnectedButtons/ConntectedButtonItems';
import { FunctionComponent } from 'react';

type TAdminNav = {
  page: string;
};

const AdminNav: FunctionComponent<TAdminNav> = ({ page }) => {
  return (
    <ConnectedButtons>
      <ConnectedButtonItem
        title={'Manage Inventory'}
        active={page == 'manage_inventory'}
        url={'/manage_inventory'}
      />
      <ConnectedButtonItem
        title={'Manage Checklist'}
        active={page == 'manage_checklist'}
        url={'/manage_checklist'}
      />
      <ConnectedButtonItem
        title={'Inventory'}
        active={page == 'inventory'}
        url={'/inventory'}
      />
      <ConnectedButtonItem
        title={'Checklist'}
        active={page == 'checklist'}
        url={'/checklist'}
      />
    </ConnectedButtons>
  );
};

export default AdminNav;
