import AbbLogo from '../Logos/AbbLogo';
import VrboLogo from '../Logos/VrboLogo';

export const Footer = () => {
  return (
    <footer className="footer bg-base-300 text-base-content p-4 grid grid-cols-3">
      <aside className="grid-flow-col items-center col-span-2">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="flex justify-self-end">
        <AbbLogo size={24} />
        <VrboLogo size={24} />
      </nav>
    </footer>
  );
};

export default Footer;
