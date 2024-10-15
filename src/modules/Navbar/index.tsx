import { MouseEvent, useEffect, useState } from 'react';
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
      },
      {
        name: 'Arrival',
        href: '/arrival',
      },
      {
        name: 'House Rules',
        href: '/house_rules',
      },
      {
        name: 'Checkout Instructions',
        href: '/checkout',
      },
    ],
  },
  {
    name: 'About Us',
    href: '/about_us',
  },
];

const light = 'olight';
const dark = 'odark';

const getInitialTheme = () => {
  return localStorage.getItem('theme') ?? light;
};

export const Navbar = () => {
  const [theme, setTheme] = useState(getInitialTheme());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save the user's preference
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === light ? dark : light));
  };

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
          <li>
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
                  <li>
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
          <li>
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
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={'/'}>
          <div className="btn bg-transparent hover:bg-transparent border-none shadow-none flex block min-w-40">
            <img src={logo} className="w-14 flex-none" />
            <h1
              className={`text-2xl font-bold font-[Pacifico] flex-1 hidden md:block`}
            >
              Vista Monte Mar
            </h1>
            <div
              className={`text-[12px] font-bold font-[Pacifico] flex-1 block md:hidden text-left`}
            >
              <h1>Vista</h1>
              <h1>Monte</h1>
              <h1>Mar</h1>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="theme-controller"
            onClick={toggleTheme}
            checked={theme === dark}
          />

          {/* sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
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
          <label htmlFor="my-drawer" className="drawer-button btn bg-base-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 drawer-button"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
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
  );
};

export default Navbar;
