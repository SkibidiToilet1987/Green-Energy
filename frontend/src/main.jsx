import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Index from './routes';
import Login from './routes/login/login';
import Register from './routes/register/register';
import Products from './routes/products/products';

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
    element: <Products/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);