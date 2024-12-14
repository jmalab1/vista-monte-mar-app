import { FunctionComponent } from 'react';
import _ from 'lodash';

type BreadcrumbType = {
  crumbs?: any[];
  active: string;
};

const Breadcrumb: FunctionComponent<BreadcrumbType> = ({ crumbs, active }) => {
  return (
    <ol className="flex items-center whitespace-nowrap">
      {crumbs &&
        crumbs.map((crumb) => (
          <li className="inline-flex items-center">
            <span className="flex items-center text-sm text-base-content">
              {crumb}
            </span>
            <svg
              className="shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 13L10 3"
                stroke="currentColor"
                stroke-linecap="round"
              ></path>
            </svg>
          </li>
        ))}
      {!_.isEmpty(crumbs) && (
        <li
          className="inline-flex items-center text-sm font-semibold text-base-content"
          aria-current="page"
        >
          {active}
        </li>
      )}
    </ol>
  );
};

export default Breadcrumb;
