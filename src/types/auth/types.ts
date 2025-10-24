// Interfaces para el estado de autenticación (versión simplificada)
export interface Role {
    id: string;
    name: string;
    displayName: string;
    permissions: string[]; // Array de permisos del rol
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: Role; // Rol del usuario con sus permisos
    permissions?: string[]; // Permisos adicionales del usuario
    isActive: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthState {
    isAuthenticated: boolean;
    initialized: boolean;
    user: User | null;
    token: string | null;
}