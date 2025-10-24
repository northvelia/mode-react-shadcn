import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions, 
  hasRole, 
  hasAllRoles, 
  isAdmin, 
  canAccessModule 
} from '@/utils/permissions';

/**
 * Hook para verificar un permiso específico
 */
export const useHasPermission = (permission: string): boolean => {
  const authState = useSelector((state: RootState) => state.auth);
  return hasPermission(authState, permission);
};

/**
 * Hook para verificar múltiples permisos (al menos uno)
 */
export const useHasAnyPermission = (permissions: string[]): boolean => {
  const authState = useSelector((state: RootState) => state.auth);
  return hasAnyPermission(authState, permissions);
};

/**
 * Hook para verificar múltiples permisos (todos)
 */
export const useHasAllPermissions = (permissions: string[]): boolean => {
  const authState = useSelector((state: RootState) => state.auth);
  return hasAllPermissions(authState, permissions);
};

/**
 * Hook para verificar un rol específico
 */
export const useHasRole = (roles: string[]): boolean => {
  const authState = useSelector((state: RootState) => state.auth);
  return hasRole(authState, roles);
};

/**
 * Hook para verificar múltiples roles (todos)
 */
export const useHasAllRoles = (roles: string[]): boolean => {
  const authState = useSelector((state: RootState) => state.auth);
  return hasAllRoles(authState, roles);
};

/**
 * Hook para verificar si es administrador
 */
export const useIsAdmin = (): boolean => {
  const authState = useSelector((state: RootState) => state.auth);
  return isAdmin(authState);
};

/**
 * Hook para verificar acceso a un módulo
 */
export const useCanAccessModule = (module: string): boolean => {
  const authState = useSelector((state: RootState) => state.auth);
  return canAccessModule(authState, module);
};

/**
 * Hook para obtener información del usuario actual
 */
export const useCurrentUser = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authState = useSelector((state: RootState) => state.auth);
  
  return {
    user,
    isAuthenticated,
    isAdmin: isAdmin(authState),
  };
};

/**
 * Hook para permisos específicos de usuarios
 */
export const useUserPermissions = () => {
  const canView = useHasPermission('user.view');
  const canCreate = useHasPermission('user.create');
  const canUpdate = useHasPermission('user.update');
  const canDelete = useHasPermission('user.delete');

  return {
    canView,
    canCreate,
    canUpdate,
    canDelete,
    canManage: canCreate || canUpdate || canDelete,
  };
};

/**
 * Hook para permisos específicos de roles
 */
export const useRolePermissions = () => {
  const canView = useHasPermission('role.view');
  const canCreate = useHasPermission('role.create');
  const canUpdate = useHasPermission('role.update');
  const canDelete = useHasPermission('role.delete');

  return {
    canView,
    canCreate,
    canUpdate,
    canDelete,
    canManage: canCreate || canUpdate || canDelete,
  };
};

/**
 * Hook para permisos de dashboard
 */
export const useDashboardPermissions = () => {
  const canView = useHasPermission('dashboard.view');
  const canViewReports = useHasPermission('reports.view');
  const canExportReports = useHasPermission('reports.export');

  return {
    canView,
    canViewReports,
    canExportReports,
  };
};

/**
 * Hook para permisos de configuración
 */
export const useSettingsPermissions = () => {
  const canView = useHasPermission('settings.view');
  const canUpdate = useHasPermission('settings.update');

  return {
    canView,
    canUpdate,
    canManage: canUpdate,
  };
};
