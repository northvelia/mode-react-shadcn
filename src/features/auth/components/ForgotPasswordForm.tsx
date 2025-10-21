import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { forgotPasswordSchema } from '@/utils/validators';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';

// Esquema de validación para el formulario
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Componente de formulario para recuperar contraseña
function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Aquí implementarías la lógica de recuperación de contraseña
      console.log('Recuperar contraseña:', data);
      // const result = await forgotPassword(data.email);
      // if (result.success) {
      //   setSuccess(true);
      // } else {
      //   setError(result.error?.message || 'Error al enviar el email');
      // }
      
      // Simulando éxito por ahora
      setTimeout(() => {
        setSuccess(true);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Error inesperado. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Email enviado</h2>
        <p className="text-gray-600">
          Te hemos enviado un enlace para restablecer tu contraseña a tu dirección de email.
        </p>
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
          className="w-full"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4')}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recuperar contraseña</h2>
        <p className="text-gray-600 mt-2">
          Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          {...register('email')}
          className={cn(errors.email && 'border-red-500')}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
      </Button>
      
      <Button 
        type="button"
        variant="outline" 
        onClick={() => window.history.back()}
        className="w-full"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver al login
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
