import { createBrowserRouter } from 'react-router-dom';
import { Login, Signup } from '../pages';
import Mypage from '../pages/Mypage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/mypage',
    element: <Mypage />,
  },
]);
