import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import PublicHeader from '@/components/shared/headers/PublicHeader';
import PublicFooter from '@/components/shared/footer/PublicFooter';

// Layout para páginas de autenticación
function PublicLayout() {
  return (
    <div className={cn('')}>
      <PublicHeader />
      <div className="flex  p-3">
        <Outlet />
      </div>
      <PublicFooter />
    </div>
  );
}

export default PublicLayout;