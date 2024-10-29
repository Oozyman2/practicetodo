import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProductsProvider } from './context/Productcontext.jsx';
import './index.css';
import Singletodo from './pages/Singletodo.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { Authprovider } from './context/Authcontext.jsx';
import ProtectedRoute from './components/Protectedroute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<App />} />,
  },
  {
    path: '/Todo/:id',
    element: <ProtectedRoute element={<Singletodo />} />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </Authprovider>
  </StrictMode>
);
