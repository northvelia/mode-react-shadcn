import { Calendar, Home, Inbox, Search, Settings, Users, BarChart3 } from 'lucide-react';
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

// Elementos del menú del dashboard
const menuItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Usuarios', url: '/users', icon: Users },
  { title: 'Inventario', url: '/inventory', icon: Inbox },
  { title: 'Calendario', url: '/calendar', icon: Calendar },
  { title: 'Búsqueda', url: '/search', icon: Search },
  { title: 'Reportes', url: '/reports', icon: BarChart3 },
  { title: 'Configuración', url: '/settings', icon: Settings },
];

// Componente de barra lateral para Dashboard
function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <button 
                      onClick={() => navigate(item.url)}
                      className={cn('flex items-center gap-2 w-full')}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
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
