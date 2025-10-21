import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarAuthLayout from '@/components/shared/SidebarAuthLayout';
import Header from '@/components/shared/Header';
import { cn } from '@/lib/utils';

// Layout para páginas autenticadas
function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className={cn('flex min-h-screen')}>
        <SidebarAuthLayout />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto px-6 pt-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;