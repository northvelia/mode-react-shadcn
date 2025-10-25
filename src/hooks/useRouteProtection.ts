import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { hasPermission, hasAnyPermission } from '@/utils/permissions';

interface RouteProtectionOptions {
  permissions?: string[];
  requireAllPermissions?: boolean;
}

/**
 * Hook para verificar si el usuario puede acceder a una ruta específica
 * BASADO SOLO EN PERMISOS - Los roles son solo agrupaciones de permisos
 */
export const useRouteProtection = (options: RouteProtectionOptions) => {
  const authState = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, user } = authState;
  const { permissions = [], requireAllPermissions = false } = options;

  return useMemo(() => {
    // Si no está autenticado, no puede acceder
    if (!isAuthenticated || !user) {
      return {
        canAccess: false,
        reason: 'not_authenticated',
        message: 'Usuario no autenticado'
      };
    }

    // Si no se especifican permisos, permitir acceso (solo autenticación requerida)
    if (permissions.length === 0) {
      return {
        canAccess: true,
        reason: 'authorized',
        message: 'Acceso autorizado (solo autenticación requerida)'
      };
    }

    // Verificar permisos
    let hasRequiredPermissions = false;
    
    if (requireAllPermissions) {
      // Requiere TODOS los permisos
      hasRequiredPermissions = permissions.every(permission => 
        hasPermission(authState, permission)
      );
    } else {
      // Requiere AL MENOS UNO de los permisos
      hasRequiredPermissions = hasAnyPermission(authState, permissions);
    }

    if (!hasRequiredPermissions) {
      return {
        canAccess: false,
        reason: 'insufficient_permissions',
        message: requireAllPermissions 
          ? `Se requieren todos los siguientes permisos: ${permissions.join(', ')}`
          : `Se requiere al menos uno de los siguientes permisos: ${permissions.join(', ')}`
      };
    }

    // Si llegó hasta aquí, puede acceder
    return {
      canAccess: true,
      reason: 'authorized',
      message: 'Acceso autorizado'
    };
  }, [authState, permissions, requireAllPermissions, isAuthenticated, user]);
};

/**
 * Hook para verificar acceso a rutas específicas del sistema
 * BASADO SOLO EN PERMISOS - Los roles son solo agrupaciones de permisos
 */


export const useRouteAccess = () => {
  const authState = useSelector((state: RootState) => state.auth);

  return {
    // Acceso al dashboard (todos los usuarios autenticados)
    canAccessDashboard: authState.isAuthenticated,
    
    // Acceso a usuarios (solo requiere permiso user.view)
    canAccessUsers: hasPermission(authState, 'user.view'),
    
    // Acceso a configuración (solo requiere permiso settings.view)
    canAccessSettings: hasPermission(authState, 'settings.view'),
    
    // Acceso a reportes (solo requiere permiso reports.view)
    canAccessReports: hasPermission(authState, 'reports.view'),
    
    // Acceso a roles (solo requiere permiso role.view)
    canAccessRoles: hasPermission(authState, 'role.view'),
    
    // Acceso a documentación (solo requiere permiso docs.view)
    canAccessDocs: hasPermission(authState, 'docs.view'),
  };
};

