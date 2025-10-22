import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { publicRoutes, protectedRoutes, errorRoutes } from '@/config/routes';
import Loading from '@/components/shared/Loading';
import ErrorBoundary from '@/components/shared/common/ErrorBoundary';
import { PublicRoute } from './PublicRoute';

// Función para crear elementos con Suspense
const createSuspenseElement = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  </Suspense>
);

// Configuración de rutas públicas
const publicRoutesConfig = publicRoutes.map(route => ({
  path: route.path,
  element: createSuspenseElement(route.element)
}));

// Configuración de rutas protegidas
const protectedRoutesConfig = protectedRoutes.map(route => ({
  path: route.path,
  element: createSuspenseElement(route.element)
}));

// Configuración de rutas de error
const errorRoutesConfig = errorRoutes.map(route => ({
  path: route.path,
  element: createSuspenseElement(route.element)
}));

// Definición de rutas
const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: publicRoutesConfig,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: protectedRoutesConfig,
      },
    ],
  },
  ...errorRoutesConfig,
]);

export default router;