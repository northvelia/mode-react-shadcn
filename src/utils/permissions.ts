import type { AuthState } from '@/types/auth/types';

/**
 * Verifica si el usuario tiene un permiso específico
 */
export const hasPermission = (authState: AuthState, permission: string): boolean => {
  const user = authState.user;
  if (!user) return false;

  // Verificar permisos del rol
  const rolePermissions = user.role?.permissions ?? [];
  
  // Verificar permisos personalizados del usuario
  const userPermissions = user.permissions ?? [];

  // Combinar todos los permisos
  const allPermissions = [...rolePermissions, ...userPermissions];

  return allPermissions.includes(permission);
};

/**
 * Verifica si el usuario tiene al menos uno de los permisos especificados
 */
export const hasAnyPermission = (authState: AuthState, permissions: string[]): boolean => {
  return permissions.some(permission => hasPermission(authState, permission));
};

/**
 * Verifica si el usuario tiene todos los permisos especificados
 */
export const hasAllPermissions = (authState: AuthState, permissions: string[]): boolean => {
  return permissions.every(permission => hasPermission(authState, permission));
};

/**
 * Verifica si el usuario tiene uno de los roles especificados
 */
export const hasRole = (authState: AuthState, roles: string[]): boolean => {
  const user = authState.user;
  if (!user) return false;
  
  return roles.includes(user.role?.name);
};

/**
 * Verifica si el usuario tiene todos los roles especificados
 */
export const hasAllRoles = (authState: AuthState, roles: string[]): boolean => {
  const user = authState.user;
  if (!user) return false;
  
  return roles.every(role => user.role?.name === role);
};

/**
 * Verifica si el usuario es administrador
 */
export const isAdmin = (authState: AuthState): boolean => {
  return hasRole(authState, ['admin', 'super_admin']);
};

/**
 * Verifica si el usuario puede acceder a un módulo específico
 */
export const canAccessModule = (authState: AuthState, module: string): boolean => {
  const user = authState.user;
  if (!user) return false;

  // Obtener todos los permisos del usuario
  const allPermissions = [
    ...(user.role?.permissions ?? []),
    ...(user.permissions ?? [])
  ];

  // Verificar si tiene algún permiso del módulo
  return allPermissions.some(permission => permission.startsWith(`${module}.`));
};
