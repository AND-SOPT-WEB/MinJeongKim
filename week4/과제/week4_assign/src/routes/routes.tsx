import { createBrowserRouter } from 'react-router-dom';
import { Login, Signup } from '../pages';

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
