import AbbLogo from '../Logos/AbbLogo';

export const Footer = () => {
  return (
    <footer className="section-frame pb-8">
      <div className="grid grid-cols-1 gap-4 rounded-[1.75rem] border border-white/70 bg-[#23404b] px-6 py-6 text-white shadow-[0_18px_50px_rgba(26,52,60,0.24)] sm:grid-cols-3 sm:items-center">
        <aside className="col-span-2">
          <p className="section-kicker text-white/65">Vista Monte Mar</p>
          <p className="mt-2 text-sm text-white/75">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </aside>
        <nav className="flex justify-start sm:justify-end">
          <AbbLogo size={24} />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
