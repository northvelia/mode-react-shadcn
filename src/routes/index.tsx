import { lazy, Suspense } from 'react';
import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import Home from '@/features/home/Home';

// Lazy loading para módulos
const Login = lazy(() => import('@/features/auth/Login'));
// const Register = lazy(() => import('../features/auth/Register'));
// const ForgotPassword = lazy(() => import('../features/auth/ForgotPassword'));
// const ChangePassword = lazy(() => import('../features/auth/ChangePassword'));
// const Home = lazy(() => import('../features/auth/Home'));

// Definición de rutas
const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense> },
    //   { path: '/register', element: <Suspense fallback={<div>Loading...</div>}><Register /></Suspense> },
    //   { path: '/forgot-password', element: <Suspense fallback={<div>Loading...</div>}><ForgotPassword /></Suspense> },
    //   { path: '/change-password', element: <Suspense fallback={<div>Loading...</div>}><ChangePassword /></Suspense> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/', element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense> },
        ],
      },
    ],
  },
  { path: '*', element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense> },
]);

export default router;