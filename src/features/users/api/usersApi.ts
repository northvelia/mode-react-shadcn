import AxiosInstance from '../../../api/axiosInstance';

// API para gestión de usuarios
export const usersApi = {
  // Obtener todos los usuarios
  getUsers: async () => {
    const response = await AxiosInstance.get('/users');
    return response.data;
  },

  // Obtener usuario por ID
  getUserById: async (id: string) => {
    const response = await AxiosInstance.get(`/users/${id}`);
    return response.data;
  },

  // Crear nuevo usuario
  createUser: async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'manager';
  }) => {
    const response = await AxiosInstance.post('/users', userData);
    return response.data;
  },

  // Actualizar usuario
  updateUser: async (id: string, userData: Partial<{
    name: string;
    email: string;
    role: 'admin' | 'user' | 'manager';
    isActive: boolean;
  }>) => {
    const response = await AxiosInstance.put(`/users/${id}`, userData);
    return response.data;
  },

  // Eliminar usuario
  deleteUser: async (id: string) => {
    const response = await AxiosInstance.delete(`/users/${id}`);
    return response.data;
  },

  // Buscar usuarios
  searchUsers: async (query: string) => {
    const response = await AxiosInstance.get(`/users/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Cambiar estado de usuario (activar/desactivar)
  toggleUserStatus: async (id: string) => {
    const response = await AxiosInstance.patch(`/users/${id}/toggle-status`);
    return response.data;
  }
};
