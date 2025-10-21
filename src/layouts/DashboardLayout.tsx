import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/shared/sidebars/DashboardSidebar';
import DashboardHeader from '@/components/shared/headers/DashboardHeader';
import { cn } from '@/lib/utils';

// Layout para páginas autenticadas
function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className={cn('flex min-h-screen')}>
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto px-6 pt-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;