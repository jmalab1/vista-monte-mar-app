import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    name: 'Photos / Videos',
    href: '/gallery',
  },
  {
    name: 'About Us',
    href: '/about_us',
  },
];

export const Navbar = () => {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  useEffect(() => {
    setIsDrawerOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const visitInfoPaths = useMemo(
    () => ['/directions', '/arrival', '/house_rules', '/checkout'],
    []
  );

  const isActive = (href?: string) => href === location.pathname;
  const isVisitInfoActive = visitInfoPaths.includes(location.pathname);

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget as unknown as HTMLButtonElement;
    button.blur();
  };

  const nav = (isMobile = false) => {
    return NAV_MENU.map(({ name, href, submenu }) => {
      if (submenu) {
        return (
          <li key={name}>
            <details open={dropdownOpen}>
              <summary
                className={`px-4 py-2 text-sm font-semibold text-[#27414d] transition hover:bg-white/80 ${
                  isMobile ? 'rounded-2xl' : 'rounded-full'
                } ${
                  isVisitInfoActive ? 'bg-[#d6a57d] text-white hover:bg-[#d6a57d]' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen((value) => !value);
                }}
              >
                {name}
              </summary>
              <ul className={`z-50 mt-3 border border-[#efe2d5] bg-white/95 p-3 shadow-xl backdrop-blur ${
                isMobile ? 'rounded-[1.75rem]' : 'rounded-3xl'
              }`}>
                {submenu.map(({ name, href }) => (
                  <li key={`${name}-${href}`}>
                    <Link
                      to={href}
                      className={`px-4 py-3 text-sm font-medium transition ${
                        isMobile ? 'rounded-xl' : 'rounded-2xl'
                      } ${
                        isActive(href)
                          ? 'bg-[#f4e0cd] text-[#9b5d31]'
                          : 'text-slate-600 hover:bg-[#f8f2ea] hover:text-[#27414d]'
                      }`}
                      onClick={handleMenuClick}
                    >
                      <span className="whitespace-nowrap">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        );
      }

      return (
        <li key={name}>
          <Link
            to={href}
            className={`px-4 py-2 text-sm font-semibold transition ${
              isMobile ? 'rounded-2xl' : 'rounded-full'
            } ${
              isActive(href)
                ? 'bg-[#d6a57d] text-white hover:bg-[#d6a57d]'
                : 'text-[#27414d] hover:bg-white/80'
            }`}
            onClick={handleMenuClick}
          >
            {name}
          </Link>
        </li>
      );
    });
  };

  return (
    <header className="sticky top-0 z-[80] overflow-x-clip px-3 pt-3 sm:px-4 lg:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-28 bg-white/25 backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,black_0%,black_38%,transparent_100%)] sm:block"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-36 bg-[linear-gradient(180deg,rgba(255,253,248,0.92),rgba(255,253,248,0.55),rgba(255,253,248,0.12),transparent)] sm:block"></div>
      <div className="section-frame">
        <div className="navbar sunset-panel min-h-0 rounded-[1.75rem] border border-white/65 bg-white/55 px-3 py-2 shadow-[0_16px_45px_rgba(36,61,70,0.16)] backdrop-blur-2xl sm:px-5">
          <div className="flex-1">
            <Link to="/" className="group flex min-w-40 items-center gap-3 rounded-full px-2 py-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7efe5] shadow-inner">
                <img src={logo} className="w-10 flex-none transition duration-300 group-hover:scale-105" />
              </div>
              <div className="hidden md:block">
                <p className="section-kicker">Costa Rica Retreat</p>
                <h1 className="font-pacifico text-2xl text-[#23404b]">Vista Monte Mar</h1>
              </div>
              <div className="block text-left font-pacifico text-[12px] text-[#23404b] md:hidden">
                <h1>Vista</h1>
                <h1>Monte</h1>
                <h1>Mar</h1>
              </div>
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal gap-2 rounded-full bg-[#fff7ef]/80 p-2">{nav()}</ul>
          </div>
          <div className="ml-2 w-12 lg:hidden">
            <button
              type="button"
              aria-label="Open navigation menu"
              className="btn rounded-full border-[#ead9ca] bg-white/80 text-[#27414d] shadow-none hover:bg-white"
              onClick={() => setIsDrawerOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[140] lg:hidden">
          <div
            className="absolute inset-0 bg-[#21414c]/18 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative h-full w-full overflow-y-auto bg-[linear-gradient(180deg,#fffdf8,#f7f1e8)] px-4 py-5">
            <div className="mx-auto flex max-w-7xl flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">Explore Your Stay</p>
                  <p className="font-pacifico text-2xl text-[#23404b]">Vista Monte Mar</p>
                </div>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="btn btn-sm h-11 min-h-0 w-11 rounded-full border-[#ead9ca] bg-white/90 p-0 text-[#27414d] shadow-none hover:bg-white"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  ✕
                </button>
              </div>
              <ul className="menu gap-2 rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-[0_18px_40px_rgba(34,56,69,0.1)]">
                {nav(true)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
