// Tipos para el módulo de usuarios
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'manager';
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: 'admin' | 'user' | 'manager';
  isActive?: boolean;
}

export interface UserFilters {
  search?: string;
  role?: 'admin' | 'user' | 'manager';
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
