import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
// import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { publicRoutes, protectedRoutes, errorRoutes } from '@/config/routes';
import Loading from '@/components/shared/Loading';
import ErrorBoundary from '@/components/shared/common/ErrorBoundary';
import { PublicRoute } from './PublicRoute';
import PublicLayout from '@/layouts/PublicLayout';
import ProtectedRouteWrapper from '@/components/shared/common/ProtectedRouteWrapper';

// Función para crear elementos con Suspense
const createSuspenseElement = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  </Suspense>
);

// Función para crear elementos protegidos con verificación de permisos
const createProtectedElement = (Component: React.ComponentType, route: any) => (
  <ProtectedRouteWrapper
    permissions={route.permissions}
    requireAllPermissions={route.requireAllPermissions}
  >
    <Component />
  </ProtectedRouteWrapper>
);

// Configuración de rutas públicas
const publicRoutesConfig = publicRoutes.map(route => ({
  path: route.path,
  element: createSuspenseElement(route.element)
}));

// Configuración de rutas protegidas
const protectedRoutesConfig = protectedRoutes.map(route => ({
  path: route.path,
  element: createProtectedElement(route.element, route)
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
        element: <PublicLayout />,
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