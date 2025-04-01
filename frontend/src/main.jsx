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
import Orders from './routes/orders/orders';
import Bookings from './routes/booking/bookings';
import Consultations from './routes/booking/consultations/consultations';
import Installations from './routes/booking/installations/installations';
import Calculator from './routes/calculator/calculator';
import EnergyUsage from './routes/energyUsage/energyUsage';
import ConsultationConfirm from './routes/booking/consultations/consultationConfirm';
import InstallationConfirm from './routes/booking/installations/installationsConfirm';

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
    path: "/about",
    element: <About />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/checkout",
    element: <Checkout/>
  },
  {
    path:"/checkout/confirm",
    element: <Confirm/>
  },
  {
    path:"/orders",
    element: <Orders/>
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
    path: "/carbon-footprint/calculator",
    element: <Calculator/>
  },
  {
    path: "/energy-usage",
    element: <EnergyUsage/>
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