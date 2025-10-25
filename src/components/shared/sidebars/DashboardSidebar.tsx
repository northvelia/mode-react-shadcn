import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebarRoutes } from '@/hooks/useSidebarRoutes';

// Componente de barra lateral para Dashboard
function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRoutes = useSidebarRoutes();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarRoutes.map((route) => (
                <SidebarMenuItem key={route.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === route.url}
                    title={route.description}
                  >
                    <button 
                      onClick={() => navigate(route.url)}
                      className={cn('flex items-center gap-2 w-full')}
                    >
                      <route.icon className="h-5 w-5" />
                      <span>{route.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default DashboardSidebar;
