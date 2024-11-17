import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

const App = () => {
  return (
    <BrowserRouter basename="/vista_monte_mar/">
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
