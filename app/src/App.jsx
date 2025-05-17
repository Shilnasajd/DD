import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Make sure this is `react-router-dom`, not just `react-router`
import { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Lazy load components
const HomePage = lazy(() => import('./pages/homepage'));
const Rentals = lazy(() => import('./pages/rentals'));
import Itemdetails from './pages/itemdetails';
import CheckoutPage from './components/items/CheckOut';
import Contact from './components/home/ContactUs';
import AboutUs from './components/home/AboutUs';
import WeddingGallery from './components/home/gallery';
import Admin from './pages/Admin';
import ScrollToTop from './pages/scroll/ScrollToTop';

function App() {
  AOS.init();
  return (
    <Suspense fallback={<div className='h-screen flex justify-center items-center'><CircularProgress /></div>}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/:id" element={<Itemdetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/gallery" element={<WeddingGallery />} />
          <Route path="/ddadmin" element={<Admin />} />
        </Routes>
      </LocalizationProvider>
    </Suspense>
  );
}

export default App;
