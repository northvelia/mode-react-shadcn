import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

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
  } from "@/components/ui/sidebar"
// Elementos del menú
const items = [
  { title: 'Home', url: '#/', icon: Home },
  { title: 'Inbox', url: '#/inbox', icon: Inbox },
  { title: 'Calendar', url: '#/calendar', icon: Calendar },
  { title: 'Search', url: '#/search', icon: Search },
  { title: 'Settings', url: '#/settings', icon: Settings },
];

// Componente de barra lateral
function SidebarAuthLayout() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className={cn('flex items-center gap-2')}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
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

export default SidebarAuthLayout;