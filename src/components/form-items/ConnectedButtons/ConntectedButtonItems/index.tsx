import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

type TConnectedButtonItem = {
  title: string;
  active?: boolean;
  url: string;
};

const ConnectedButtonItem: FunctionComponent<TConnectedButtonItem> = ({
  title,
  active,
  url,
}) => {
  let classNamePlus = 'font-medium bg-white';

  if (active) {
    classNamePlus = ' bg-gray-100 font-extrabold';
  }

  return (
    <li
      className={`inline-flex items-center gap-x-2 py-3 px-4 text-sm border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-white ${classNamePlus}`}
    >
      <Link to={url}>{title}</Link>
    </li>
  );
};

export default ConnectedButtonItem;
