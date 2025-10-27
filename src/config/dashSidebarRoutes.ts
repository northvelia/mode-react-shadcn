
import {
    Home,
    Users,
    Shield,
    Settings,
    BarChart3,
    UserCog,
    FileText
  } from 'lucide-react';

const dashSidebarRoutes = [ // rutas para DashboardSidebar en DashboardLayout
    {
        title: 'Dashboard',
        path: '/c',
        icon: Home,
        description: 'Panel principal',
        // Sin restricciones - todos los usuarios autenticados
    },
    {
        title: 'Usuarios',
        path: '/users',
        icon: Users,
        permissions: ['user.view'],
        description: 'Gestión de usuarios'
    },
    {
        title: 'Ejemplo Protección',
        path: '/route-protection-example',
        icon: Shield,
        permissions: ['dashboard.view'],
        description: 'Ejemplo de protección de rutas'
    },
    {
        title: 'Gestión de Roles',
        path: '/roles',
        icon: UserCog,
        permissions: ['role.view'],
        description: 'Administrar roles y permisos'
    },
    {
        title: 'Reportes',
        path: '/reports',
        icon: BarChart3,
        permissions: ['reports.view'],
        description: 'Reportes del sistema'
    },
    {
        title: 'Configuración',
        path: '/settings',
        icon: Settings,
        permissions: ['settings.view'],
        description: 'Configuración del sistema'
    },
    {
        title: 'Documentación',
        path: '/docs',
        icon: FileText,
        permissions: ['docs.view'],
        description: 'Documentación técnica'
    }
];

export default dashSidebarRoutes;