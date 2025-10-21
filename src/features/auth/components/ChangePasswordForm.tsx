import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { changePasswordSchema } from '@/utils/validators';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

// Esquema de validación para el formulario
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Componente de formulario para cambiar contraseña
function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Aquí implementarías la lógica de cambio de contraseña
      console.log('Cambiar contraseña:', data);
      // const result = await changePassword(data);
      // if (result.success) {
      //   setSuccess(true);
      //   reset();
      // } else {
      //   setError(result.error?.message || 'Error al cambiar la contraseña');
      // }
      
      // Simulando éxito por ahora
      setTimeout(() => {
        setSuccess(true);
        reset();
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
        <h2 className="text-2xl font-bold text-gray-900">Contraseña cambiada</h2>
        <p className="text-gray-600">
          Tu contraseña ha sido cambiada exitosamente.
        </p>
        <Button 
          onClick={() => setSuccess(false)}
          className="w-full"
        >
          Cambiar otra contraseña
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4')}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Cambiar contraseña</h2>
        <p className="text-gray-600 mt-2">
          Ingresa tu contraseña actual y la nueva contraseña.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Contraseña actual</Label>
        <div className="relative">
          <Input
            id="currentPassword"
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder="Tu contraseña actual"
            {...register('currentPassword')}
            className={cn(errors.currentPassword && 'border-red-500')}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.currentPassword && (
          <p className="text-sm text-red-600">{errors.currentPassword.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="newPassword">Nueva contraseña</Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Tu nueva contraseña"
            {...register('newPassword')}
            className={cn(errors.newPassword && 'border-red-500')}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.newPassword && (
          <p className="text-sm text-red-600">{errors.newPassword.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirma tu nueva contraseña"
            {...register('confirmPassword')}
            className={cn(errors.confirmPassword && 'border-red-500')}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? 'Cambiando contraseña...' : 'Cambiar contraseña'}
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
