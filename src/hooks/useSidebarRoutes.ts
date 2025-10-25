import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { hasPermission, hasAnyPermission } from '@/utils/permissions';
import { 
  Home, 
  Users, 
  Shield, 
  Settings, 
  BarChart3,
  UserCog,
  FileText
} from 'lucide-react';

interface SidebarRoute {
  title: string;
  url: string;
  icon: any;
  permissions?: string[];
  requireAllPermissions?: boolean;
  description?: string;
}

/**
 * Hook para obtener rutas del sidebar filtradas SOLO por permisos
 * BASADO EN PERMISOS - Los roles son solo agrupaciones de permisos
 */
export const useSidebarRoutes = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, user } = authState;

  return useMemo(() => {
    // Definición de todas las rutas del sidebar
    const allRoutes: SidebarRoute[] = [
      {
        title: 'Dashboard',
        url: '/c',
        icon: Home,
        description: 'Panel principal',
        // Sin restricciones - todos los usuarios autenticados
      },
      {
        title: 'Usuarios',
        url: '/users',
        icon: Users,
        permissions: ['user.view'],
        description: 'Gestión de usuarios'
      },
      {
        title: 'Ejemplo Protección',
        url: '/route-protection-example',
        icon: Shield,
        permissions: ['dashboard.view'],
        description: 'Ejemplo de protección de rutas'
      },
      {
        title: 'Gestión de Roles',
        url: '/roles',
        icon: UserCog,
        permissions: ['role.view'],
        description: 'Administrar roles y permisos'
      },
      {
        title: 'Reportes',
        url: '/reports',
        icon: BarChart3,
        permissions: ['reports.view'],
        description: 'Reportes del sistema'
      },
      {
        title: 'Configuración',
        url: '/settings',
        icon: Settings,
        permissions: ['settings.view'],
        description: 'Configuración del sistema'
      },
      {
        title: 'Documentación',
        url: '/docs',
        icon: FileText,
        permissions: ['docs.view'],
        description: 'Documentación técnica'
      }
    ];

    // Si no está autenticado, no mostrar rutas
    if (!isAuthenticated || !user) {
      return [];
    }

    // Filtrar rutas según permisos
    return allRoutes.filter(route => {
      // Si no hay restricciones de permisos, permitir acceso
      if (!route.permissions || route.permissions.length === 0) {
        return true;
      }

      // Verificar permisos
      if (route.requireAllPermissions) {
        // Requiere TODOS los permisos
        return route.permissions.every(permission => 
          hasPermission(authState, permission)
        );
      } else {
        // Requiere AL MENOS UNO de los permisos
        return hasAnyPermission(authState, route.permissions);
      }
    });
  }, [authState, isAuthenticated, user]);
};

/**
 * Hook para verificar si el usuario puede acceder a una ruta específica
 */
export const useCanAccessRoute = (routeUrl: string): boolean => {
  const sidebarRoutes = useSidebarRoutes();
  return sidebarRoutes.some(route => route.url === routeUrl);
};

/**
 * Hook para obtener información de una ruta específica
 */
export const useRouteInfo = (routeUrl: string) => {
  const sidebarRoutes = useSidebarRoutes();
  return sidebarRoutes.find(route => route.url === routeUrl);
};

