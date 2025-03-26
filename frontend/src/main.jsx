import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { CartProvider } from './context/CartContext';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Index from './routes';
import Login from './routes/login/login';
import Register from './routes/register/register';
import Products from './routes/products/products';
import About from './routes/about/about';
import 'bootstrap/dist/css/bootstrap.css';

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