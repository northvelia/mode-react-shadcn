import axiosInstance from '../../api/axiosInstance';
import type { User } from '@/types/auth/types';
import { toast } from 'sonner';

// Servicios de autenticación
export const loginUser = async (email: string, password: string) => {
  try {
    await axiosInstance.get('/sanctum/csrf-cookie');
    const response = await axiosInstance.post('/api/login', { email, password });
    toast.success('Login exitoso');
    return response.data as { user: User; token: string };
  } catch (error) {
    toast.error('Error en el login');
    throw error;
  }
};

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/register', { name, email, password });
    toast.success('Registro exitoso');
    return response.data as { user: User; token: string };
  } catch (error) {
    toast.error('Error en el registro');
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    toast.success('Correo de recuperación enviado');
    return response.data;
  } catch (error) {
    toast.error('Error al enviar correo');
    throw error;
  }
};

export const changePassword = async (token: string, newPassword: string) => {
  try {
    const response = await axiosInstance.post('/auth/change-password', { token, newPassword });
    toast.success('Contraseña cambiada');
    return response.data;
  } catch (error) {
    toast.error('Error al cambiar contraseña');
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.post('/auth/logout');
    toast.success('Sesión cerrada');
    return true;
  } catch (error) {
    toast.error('Error al cerrar sesión');
    return false;
  }
};