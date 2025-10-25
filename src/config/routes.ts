import Home from '@/features/public/pages/Home';
import { lazy } from 'react';

// Lazy loading para módulos de autenticación
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const ChangePasswordPage = lazy(() => import('@/features/auth/pages/ChangePasswordPage'));

// Lazy loading para páginas del dashboard
const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
const UsersPage = lazy(() => import('@/features/users/pages/UsersPage'));
const RolesPage = lazy(() => import('@/features/roles/pages/RolesPage'));
const ReportsPage = lazy(() => import('@/features/reports/pages/ReportsPage'));
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'));
const DocsPage = lazy(() => import('@/features/docs/pages/DocsPage'));

// Configuración de rutas públicas (sin autenticación)
export const publicRoutes = [
  {
    path: '/',
    element: Home,
    title: 'Vista inicial',
    description: 'Vista publica'
  },
  {
    path: '/login',
    element: LoginPage,
    title: 'Iniciar Sesión',
    description: 'Accede a tu cuenta'
  },
  {
    path: '/register',
    element: RegisterPage,
    title: 'Registrarse',
    description: 'Crea una nueva cuenta'
  },
  {
    path: '/forgot-password',
    element: ForgotPasswordPage,
    title: 'Recuperar Contraseña',
    description: 'Restablece tu contraseña'
  },
  {
    path: '/change-password',
    element: ChangePasswordPage,
    title: 'Cambiar Contraseña',
    description: 'Actualiza tu contraseña'
  }
];

// Configuración de rutas protegidas (requieren autenticación)
export const protectedRoutes = [
  {
    path: '/c',
    element: HomePage,
    title: 'Dashboard',
    description: 'Panel principal',
    icon: 'Home',
    showInSidebar: true,
    // Sin restricciones - todos los usuarios autenticados pueden acceder
  },
  {
    path: '/users',
    element: UsersPage,
    title: 'Usuarios',
    description: 'Gestión de usuarios',
    icon: 'Users',
    showInSidebar: true,
    roles: ['admin', 'manager'],
    permissions: ['user.view'],
    requireAllPermissions: false // Al menos uno de los permisos
  },
  {
    path: '/route-protection-example',
    element: lazy(() => import('@/examples/RouteProtectionExample')),
    title: 'Ejemplo Protección',
    description: 'Ejemplo de protección de rutas',
    icon: 'Shield',
    showInSidebar: true,
    roles: ['admin', 'manager'],
    permissions: ['dashboard.view']
  },
  {
    path: '/sidebar-protection-example',
    element: lazy(() => import('@/examples/SidebarProtectionExample')),
    title: 'Ejemplo Sidebar',
    description: 'Ejemplo de protección del sidebar',
    icon: 'Sidebar',
    showInSidebar: true,
    roles: ['admin', 'manager'],
    permissions: ['dashboard.view']
  },
  {
    path: '/roles',
    element: RolesPage,
    title: 'Gestión de Roles',
    description: 'Administrar roles y permisos',
    icon: 'UserCog',
    showInSidebar: true,
    roles: ['admin'],
    permissions: ['role.view']
  },
  {
    path: '/reports',
    element: ReportsPage,
    title: 'Reportes',
    description: 'Reportes del sistema',
    icon: 'BarChart3',
    showInSidebar: true,
    roles: ['admin', 'manager'],
    permissions: ['reports.view']
  },
  {
    path: '/settings',
    element: SettingsPage,
    title: 'Configuración',
    description: 'Configuración del sistema',
    icon: 'Settings',
    showInSidebar: true,
    roles: ['admin']
  },
  {
    path: '/docs',
    element: DocsPage,
    title: 'Documentación',
    description: 'Documentación técnica',
    icon: 'FileText',
    showInSidebar: true,
    roles: ['admin', 'manager'],
    permissions: ['docs.view']
  }
];

// Configuración de rutas de error
export const errorRoutes = [
  {
    path: '/unauthorized',
    element: lazy(() => import('@/components/shared/common/Unauthorized')),
    title: 'No autorizado'
  },
  {
    path: '*',
    element: lazy(() => import('@/components/shared/common/NotFound')),
    title: 'Página no encontrada'
  }
];

// Función para obtener rutas por rol
export const getRoutesByRole = (userRole: string = 'user') => {
  return protectedRoutes.filter(route =>
    !route.roles || route.roles.includes(userRole)
  );
};

// Función para obtener rutas del sidebar
export const getSidebarRoutes = (userRole: string = 'user') => {
  return protectedRoutes.filter(route =>
    route.showInSidebar && (!route.roles || route.roles.includes(userRole))
  );
};
