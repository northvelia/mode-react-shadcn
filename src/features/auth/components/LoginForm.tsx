import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useLogin } from '../hooks';

import { z } from 'zod';

import { loginSchema } from '@/utils/validators';
import { cn } from '@/lib/utils';
// Esquema de validación para el formulario
type LoginFormData = z.infer<typeof loginSchema>;

// Componente de formulario de login
function LoginForm() {
  const { handleLogin } = useLogin();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

  const onSubmit = async (data: LoginFormData) => {
    const result = await handleLogin(data.email, data.password);
    if (!result.success) {
      console.error(result.error);
    }
  };

  return (
    <form  className={cn('space-y-4')}>
      <div>
        <Input
          type="email"
          placeholder="Email"
        
        />
        
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"

        />
      
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}

export default LoginForm;