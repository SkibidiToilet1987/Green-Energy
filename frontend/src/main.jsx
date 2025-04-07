import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { CartProvider } from './context/CartContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './routes/login/login';
import Register from './routes/register/register';
import Index from './routes';
import Products from './routes/products/products';
import About from './routes/about/about';
import Cart from './routes/cart/cart';
import Checkout from './routes/checkout/checkout';
import Confirm from './routes/checkout/confirm';
import Bookings from './routes/booking/bookings';
import Consultations from './routes/booking/consultations/consultations';
import Installations from './routes/booking/installations/installations';
import EnergyUsage from './routes/energyUsage/energyUsage';
import ConsultationConfirm from './routes/booking/consultations/consultationConfirm';
import InstallationConfirm from './routes/booking/installations/installationsConfirm';
import EnergyUsageCalculator from './routes/energyUsage/energyUsageCalculator';
import CarbonFootprintCalculator from './routes/carbonFootprint/carbonFootprintCalculator';
import CarbonFootprint from './routes/carbonFootprint/carbonFootPrint';
import ContactForm from './routes/contactForm/contactForm';
import ContactFormConfirm from './routes/contactForm/contactFormConfirm';
import AccountPage from './routes/account/account';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/about-us",
    element: <About />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/cart/checkout",
    element: <Checkout/>
  },
  {
    path:"/cart/checkout/confirm",
    element: <Confirm/>
  },
  {
    path: "/bookings",
    element: <Bookings/>
  },
  {
    path: "/bookings/installations",
    element: <Installations/>
  },{
    path: "/bookings/installations/confirm",
    element: <InstallationConfirm/>
  },
  {
    path: "/bookings/consultations",
    element: <Consultations/>
  },
  {
    path: "bookings/consultations/confirm",
    element: <ConsultationConfirm/>
  },
  {
    path: "/carbon-footprint",
    element: <CarbonFootprint/>
  },
  {
    path: "/carbon-footprint/calculator",
    element: <CarbonFootprintCalculator/>
  },
  {
    path: "/energy-usage",
    element: <EnergyUsage/>
  },
  {
    path: "/energy-usage/calculator",
    element: <EnergyUsageCalculator/>
  },
  {
    path: "/contact",
    element: <ContactForm/>
  },
  {
    path: "/contact/confirm",
    element: <ContactFormConfirm/>
  },
  {
    path: "/account",
    element: <AccountPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </CookiesProvider>
  </React.StrictMode>
);