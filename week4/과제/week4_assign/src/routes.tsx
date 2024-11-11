import { createBrowserRouter } from 'react-router-dom';
import { Login, Signup } from './pages/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);
