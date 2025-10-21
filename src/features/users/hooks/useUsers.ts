import { useState, useEffect } from 'react';
import { useNotifications } from '../../../hooks/useNotifications';
import { useLoading } from '../../../hooks/useLoading';

// Hook para manejar usuarios
export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useNotifications();
  const { withLoading } = useLoading();

  // Cargar usuarios
  const loadUsers = async () => {
    try {
      await withLoading(async () => {
        // Aquí harías la llamada a la API
        // const response = await usersApi.getUsers();
        // setUsers(response.data);
        
        // Simulando datos por ahora
        const mockUsers = [
          {
            id: '1',
            name: 'Juan Pérez',
            email: 'juan@example.com',
            role: 'admin',
            isActive: true,
            avatar: null
          },
          {
            id: '2',
            name: 'María García',
            email: 'maria@example.com',
            role: 'manager',
            isActive: true,
            avatar: null
          },
          {
            id: '3',
            name: 'Carlos López',
            email: 'carlos@example.com',
            role: 'user',
            isActive: false,
            avatar: null
          }
        ];
        setUsers(mockUsers);
      });
    } catch (error) {
      showError('Error al cargar los usuarios');
    }
  };

  // Crear usuario
  const createUser = async (userData: any) => {
    try {
      await withLoading(async () => {
        // const response = await usersApi.createUser(userData);
        // setUsers(prev => [...prev, response.data]);
        
        // Simulando creación
        const newUser = {
          id: Date.now().toString(),
          ...userData,
          isActive: true
        };
        setUsers(prev => [...prev, newUser]);
        showSuccess('Usuario creado exitosamente');
      });
    } catch (error) {
      showError('Error al crear el usuario');
    }
  };

  // Actualizar usuario
  const updateUser = async (userId: string, userData: any) => {
    try {
      await withLoading(async () => {
        // const response = await usersApi.updateUser(userId, userData);
        // setUsers(prev => prev.map(user => 
        //   user.id === userId ? response.data : user
        // ));
        
        // Simulando actualización
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, ...userData } : user
        ));
        showSuccess('Usuario actualizado exitosamente');
      });
    } catch (error) {
      showError('Error al actualizar el usuario');
    }
  };

  // Eliminar usuario
  const deleteUser = async (userId: string) => {
    try {
      await withLoading(async () => {
        // await usersApi.deleteUser(userId);
        // setUsers(prev => prev.filter(user => user.id !== userId));
        
        // Simulando eliminación
        setUsers(prev => prev.filter(user => user.id !== userId));
        showSuccess('Usuario eliminado exitosamente');
      });
    } catch (error) {
      showError('Error al eliminar el usuario');
    }
  };

  // Filtrar usuarios
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users: filteredUsers,
    searchTerm,
    setSearchTerm,
    createUser,
    updateUser,
    deleteUser,
    loadUsers
  };
};
