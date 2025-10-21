import { lazy } from 'react';

// Lazy loading para módulos de autenticación
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const ChangePasswordPage = lazy(() => import('@/features/auth/pages/ChangePasswordPage'));

// Lazy loading para páginas del dashboard
const HomePage = lazy(() => import('@/features/home/Home'));
const UsersPage = lazy(() => import('@/features/users/pages/UsersPage'));
// const InventoryPage = lazy(() => import('@/features/inventory/pages/InventoryPage'));
// const ReportsPage = lazy(() => import('@/features/reports/pages/ReportsPage'));
// const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'));

// Configuración de rutas públicas (sin autenticación)
export const publicRoutes = [
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
    path: '/',
    element: HomePage,
    title: 'Dashboard',
    description: 'Panel principal',
    icon: 'Home',
    showInSidebar: true
  },
  {
    path: '/users',
    element: UsersPage,
    title: 'Usuarios',
    description: 'Gestión de usuarios',
    icon: 'Users',
    showInSidebar: true,
    roles: ['admin', 'manager']
  },
  // {
  //   path: '/inventory',
  //   element: InventoryPage,
  //   title: 'Inventario',
  //   description: 'Gestión de inventario',
  //   icon: 'Inbox',
  //   showInSidebar: true
  // },
  // {
  //   path: '/reports',
  //   element: ReportsPage,
  //   title: 'Reportes',
  //   description: 'Reportes y estadísticas',
  //   icon: 'BarChart3',
  //   showInSidebar: true
  // },
  // {
  //   path: '/settings',
  //   element: SettingsPage,
  //   title: 'Configuración',
  //   description: 'Configuración del sistema',
  //   icon: 'Settings',
  //   showInSidebar: true
  // }
];

// Configuración de rutas de error
export const errorRoutes = [
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
