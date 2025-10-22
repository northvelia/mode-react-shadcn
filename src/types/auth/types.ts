// Interfaces para el estado de autenticación
export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    initialized: boolean,
    user: User | null;
    token: string | null;
}