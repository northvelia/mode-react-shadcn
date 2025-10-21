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
});