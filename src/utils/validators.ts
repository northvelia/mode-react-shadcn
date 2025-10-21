import { z } from 'zod';

// Esquema de validación para login
export const loginSchema = z.object({
  email: z
    .string()
    .min(4, 'El email debe tener al menos 4 caracteres')
    .email('Debe ser un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Esquema de validación para registro
export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z
    .string()
    .min(4, 'El email debe tener al menos 4 caracteres')
    .email('Debe ser un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'La confirmación de contraseña debe tener al menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

// Esquema de validación para recuperar contraseña
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(4, 'El email debe tener al menos 4 caracteres')
    .email('Debe ser un email válido'),
});

// Esquema de validación para cambiar contraseña
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'La contraseña actual debe tener al menos 6 caracteres'),
  newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'La confirmación de contraseña debe tener al menos 6 caracteres'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});