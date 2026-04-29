import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './modules/Footer';
import Navbar from './modules/Navbar';
import HouseRules from './pages/HouseRules';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import NotFound from './components/NotFound';
import Directions from './pages/Directions';
import Arrival from './pages/Arrival';
import Checkout from './pages/Checkout';
import './index.css';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ManageInventory from './pages/ManageInventoryList';
import ManageChecklist from './pages/ManageChecklist';
import Inventory from './pages/Inventory';
import Checklist from './pages/Checklist';
import History from './pages/History';
import ScrollToTop from 'react-scroll-up';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

const RouteScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
};

const APP_CHROME_HIDDEN_ROUTES = new Set([
  '/login',
  '/forgot-password',
  '/manage_inventory',
  '/manage_checklist',
  '/inventory',
  '/checklist',
  '/history',
]);

const ADMIN_ROUTES = new Set([
  '/manage_inventory',
  '/manage_checklist',
  '/inventory',
  '/checklist',
  '/history',
]);

const AppShell = () => {
  const location = useLocation();
  const shouldHideChrome = APP_CHROME_HIDDEN_ROUTES.has(location.pathname);
  const isAdminRoute = ADMIN_ROUTES.has(location.pathname);

  useEffect(() => {
    document.body.classList.toggle('admin-mode', isAdminRoute);
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, [isAdminRoute]);

  return (
    <>
      <RouteScrollToTop />
      {!shouldHideChrome && (
        <ScrollToTop showUnder={160} style={{ zIndex: 1000000 }}>
          <FontAwesomeIcon icon={faArrowCircleUp} size="2xl" />
        </ScrollToTop>
      )}
      <div>
        {!shouldHideChrome && <Navbar />}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/house_rules" element={<HouseRules />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/directions" element={<Directions />} />
            <Route path="/arrival" element={<Arrival />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/manage_inventory" element={<ManageInventory />} />
            <Route path="/manage_checklist" element={<ManageChecklist />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {!shouldHideChrome && <Footer />}
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter basename="/vista_monte_mar/">
      <AppShell />
    </BrowserRouter>
  );
};

export default App;
