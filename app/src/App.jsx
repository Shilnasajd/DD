import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { Suspense, lazy } from 'react'
import { CircularProgress } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Lazy load your components
const HomePage = lazy(() => import('./pages/homepage'))
const Rentals = lazy(() => import('./pages/rentals'))
// const ProductViewPage = lazy(() => import('./pages/product-view'))
// const CheckoutPage = lazy(() => import('./pages/checkout'))
import AOS from 'aos';
import 'aos/dist/aos.css';
import Itemdetails from './pages/itemdetails'
import CheckoutPage from './components/items/CheckOut';
function App() {
  AOS.init();
  return (  
      <Suspense fallback={<div className='h-screen flex justify-center items-center' ><CircularProgress /></div>}>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/:id" element={<Itemdetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* 
          <Route path="/product/:id" element={<ProductViewPage />} />
           */}
        </Routes>
        </LocalizationProvider>
      </Suspense>
  )
}

export default App
