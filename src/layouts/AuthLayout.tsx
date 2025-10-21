import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Layout para páginas de autenticación
function AuthLayout() {
  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-gray-100 pt-12')}>
      <Outlet />
    </div>
  );
}

export default AuthLayout;