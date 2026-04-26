import { MouseEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.svg?w=256&webp';

const NAV_MENU = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Visit Information',
    submenu: [
      {
        name: 'Directions',
        href: '/directions',
        crumb: ['Home', 'Visit Information'],
      },
      {
        name: 'Arrival',
        href: '/arrival',
        crumb: ['Home', 'Visit Information'],
      },
      {
        name: 'House Rules',
        href: '/house_rules',
        crumb: ['Home', 'Visit Information'],
      },
      {
        name: 'Checkout Instructions',
        href: '/checkout',
        crumb: ['Home', 'Visit Information'],
      },
    ],
  },
  {
    name: 'Gallery',
    href: '/gallery',
    crumb: ['Home'],
  },
  {
    name: 'About Us',
    href: '/about_us',
    crumb: ['Home'],
  },
];

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Home');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('details')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (e: MouseEvent<HTMLAnchorElement>, name: string) => {
    const button = e.currentTarget as unknown as HTMLButtonElement;
    button.blur();

    setIsDrawerOpen(false);
    setActiveMenuItem(name);
    setDropdownOpen(false);
  };

  const nav = () => {
    return NAV_MENU.map(({ name, href, submenu }) => {
      if (submenu) {
        return (
          <li key={name}>
            <details open={dropdownOpen}>
              <summary
                className={`text-md font-bold ${activeMenuItem == name ? 'bg-secondary' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(true);
                }}
              >
                {name}
              </summary>
              <ul className="rounded-t-none p-2 z-50">
                {submenu.map(({ name, href }) => (
                  <li key={`${name}-${href}`}>
                    <Link
                      to={href}
                      className={`text-md font-bold ${activeMenuItem == name ? 'bg-secondary text-base-100 hover:bg-secondary' : ''}`}
                      onClick={(e) => handleMenuClick(e, name)}
                    >
                      <span className="whitespace-nowrap">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        );
      } else {
        return (
          <li key={name}>
            <Link
              to={href}
              className={`text-md text-nuetral font-bold ${activeMenuItem == name ? 'bg-secondary text-base-100 hover:bg-secondary' : ''}`}
              onClick={(e) => handleMenuClick(e, name)}
            >
              {name}
            </Link>
          </li>
        );
      }
    });
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to={'/'}>
            <div className="btn bg-transparent hover:bg-transparent border-none shadow-none flex block min-w-40">
              <img src={logo} className="w-14 flex-none" />
              <h1 className="text-2xl font-bold font-[Pacifico] flex-1 hidden md:block">
                Vista Monte Mar
              </h1>
              <div className="text-[12px] font-bold font-[Pacifico] flex-1 block md:hidden text-left">
                <h1>Vista</h1>
                <h1>Monte</h1>
                <h1>Mar</h1>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex-none hidden lg:block">
          <ul className="flex gap-1 menu menu-horizontal px-1">{nav()}</ul>
        </div>
        <div className="drawer lg:hidden sm:block w-12 ml-2 mr-2">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={isDrawerOpen}
            onChange={(e) => setIsDrawerOpen(e.target.checked)}
          />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="drawer-button btn bg-base-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 drawer-button"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </label>
          </div>
          <div className="drawer-side z-50 opacity-98">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {nav()}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
