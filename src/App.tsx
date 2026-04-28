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

const App = () => {
  return (
    <BrowserRouter basename="/vista_monte_mar/">
      <RouteScrollToTop />
      <ScrollToTop showUnder={160} style={{ zIndex: 1000000 }}>
        <FontAwesomeIcon icon={faArrowCircleUp} size="2xl" />
      </ScrollToTop>
      <div>
        <Navbar />
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
            <Route path="/manage_inventory" element={<ManageInventory />} />
            <Route path="/manage_checklist" element={<ManageChecklist />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
