import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import PublicHeader from '@/components/shared/headers/PublicHeader';

// Layout para páginas de autenticación
function PublicLayout() {
  return (
    <div className={cn('')}>
      <PublicHeader />
      <div className="flex items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default PublicLayout;