import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { hasPermission, hasAnyPermission, hasAllPermissions, hasRole, hasAllRoles, canAccessModule } from '@/utils/permissions';

interface PermissionGuardProps {
  // Permisos individuales
  permission?: string;
  permissions?: string[];
  requireAll?: boolean; // Si requiere TODOS los permisos o solo ALGUNO
  
  // Roles
  roles?: string[];
  requireAllRoles?: boolean; // Si requiere TODOS los roles o solo ALGUNO
  
  // Módulos
  module?: string;
  
  // Contenido
  children: React.ReactNode;
  fallback?: React.ReactNode;
  
  // Comportamiento
  showFallback?: boolean; // Si mostrar fallback cuando no tiene permisos
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  permissions,
  requireAll = false,
  roles,
  requireAllRoles = false,
  module,
  fallback = null,
  showFallback = false,
  children,
}) => {
  const authState = useSelector((state: RootState) => state.auth);

  let allowed = false;

  // Verificar por módulo
  if (module) {
    allowed = canAccessModule(authState, module);
  }
  // Verificar por roles
  else if (roles && roles.length > 0) {
    allowed = requireAllRoles 
      ? hasAllRoles(authState, roles)
      : hasRole(authState, roles);
  }
  // Verificar por permisos
  else if (permissions && permissions.length > 0) {
    allowed = requireAll 
      ? hasAllPermissions(authState, permissions)
      : hasAnyPermission(authState, permissions);
  }
  // Verificar permiso individual
  else if (permission) {
    allowed = hasPermission(authState, permission);
  }

  if (!allowed && showFallback) {
    return <>{fallback}</>;
  }

  return allowed ? <>{children}</> : null;
};

export default PermissionGuard;
