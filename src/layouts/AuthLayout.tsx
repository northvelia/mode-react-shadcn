import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AuthHeader from '@/components/shared/headers/AuthHeader';

// Layout para páginas de autenticación
function AuthLayout() {
  return (
    <div className={cn('min-h-screen bg-gray-100')}>
      <AuthHeader />
      <div className="flex items-center justify-center pt-12">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;