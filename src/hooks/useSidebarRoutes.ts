// src/hooks/useSidebarRoutes.ts
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { hasPermission, hasAnyPermission } from '@/utils/permissions';

interface RouteConfig {
    path: string;
    title: string;
    description?: string;
    icon?: any;
    permissions?: string[];
    requireAllPermissions?: boolean;
    showInSidebar?: boolean;
}

export const useSidebarRoutes = (routes: RouteConfig[]) => {
    const authState = useSelector((state: RootState) => state.auth);
    const { isAuthenticated, user } = authState;

    return useMemo(() => {
        if (!isAuthenticated) return [];



        return routes.filter(route => {
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
