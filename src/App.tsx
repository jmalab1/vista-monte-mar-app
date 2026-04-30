import { useEffect, useState } from 'react';
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
import Audit from './pages/Audit';
import ScrollToTop from 'react-scroll-up';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './context/AuthContext';
import { useAdminPreferences } from './context/AdminPreferencesContext';

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
  '/audit',
]);

const ADMIN_ROUTES = new Set([
  '/manage_inventory',
  '/manage_checklist',
  '/inventory',
  '/checklist',
  '/history',
  '/audit',
]);

const AppShell = () => {
  const location = useLocation();
  const {
    isAuthenticated,
    showSessionExpiryWarning,
    keepSessionAlive,
    sessionExpiryWarningEndsAt,
  } = useAuth();
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const shouldHideChrome = APP_CHROME_HIDDEN_ROUTES.has(location.pathname);
  const isAdminRoute = ADMIN_ROUTES.has(location.pathname);
  const { preferences } = useAdminPreferences();

  useEffect(() => {
    document.body.classList.toggle('admin-mode', isAdminRoute);
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, [isAdminRoute]);

  useEffect(() => {
    const shouldEnableAdminDark = isAdminRoute && preferences.darkMode;
    document.body.classList.toggle('admin-dark-mode', shouldEnableAdminDark);
    return () => {
      document.body.classList.remove('admin-dark-mode');
    };
  }, [isAdminRoute, preferences.darkMode]);

  useEffect(() => {
    if (!showSessionExpiryWarning || !sessionExpiryWarningEndsAt) {
      setRemainingSeconds(0);
      return;
    }

    const updateRemaining = () => {
      const seconds = Math.max(
        0,
        Math.ceil((sessionExpiryWarningEndsAt - Date.now()) / 1000)
      );
      setRemainingSeconds(seconds);
    };

    updateRemaining();
    const interval = window.setInterval(updateRemaining, 1000);
    return () => window.clearInterval(interval);
  }, [showSessionExpiryWarning, sessionExpiryWarningEndsAt]);

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
            <Route path="/audit" element={<Audit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {!shouldHideChrome && <Footer />}
      </div>
      {isAuthenticated && showSessionExpiryWarning && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Session Expiring Soon</h3>
            <p className="py-4">
              You have been inactive. Your session will end in 10 minutes unless you choose
              to stay signed in.
            </p>
            <p className="text-sm font-semibold text-slate-800">
              Time remaining: {remainingSeconds}s
            </p>
            <div className="modal-action">
              <button
                className="rounded-md border border-blue-900 bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:border-blue-950 hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                onClick={keepSessionAlive}
              >
                Stay Signed In
              </button>
            </div>
          </div>
        </dialog>
      )}
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
