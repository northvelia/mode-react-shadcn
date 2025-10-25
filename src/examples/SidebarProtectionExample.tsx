import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sidebar, Users, Shield, Settings, BarChart3, FileText, UserCog } from 'lucide-react';
import { useSidebarRoutes, useCanAccessRoute } from '@/hooks/useSidebarRoutes';
import { useCurrentUser } from '@/hooks/usePermissions';

const SidebarProtectionExample = () => {
  const { user, isAuthenticated } = useCurrentUser();
  const sidebarRoutes = useSidebarRoutes();
  const canAccessUsers = useCanAccessRoute('/users');
  const canAccessSettings = useCanAccessRoute('/settings');
  const canAccessReports = useCanAccessRoute('/reports');

  const getStatusIcon = (canAccess: boolean) => {
    return canAccess ? '✅' : '❌';
  };

  const getStatusColor = (canAccess: boolean) => {
    return canAccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Ejemplo de Protección del Sidebar</h1>
        <p className="text-gray-600 mt-2">
          Demostración de cómo el sidebar se adapta según roles y permisos
        </p>
      </div>

      {/* Información del usuario actual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Usuario Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><strong>Autenticado:</strong> {isAuthenticated ? 'Sí' : 'No'}</p>
              <p><strong>Nombre:</strong> {user?.name || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Rol:</strong> 
                <Badge variant="secondary" className="ml-2">
                  {user?.role?.name || 'Sin rol'}
                </Badge>
              </p>
              <p><strong>Permisos del rol:</strong></p>
              <div className="flex flex-wrap gap-1">
                {user?.role?.permissions?.map(permission => (
                  <Badge key={permission} variant="outline" className="text-xs">
                    {permission}
                  </Badge>
                )) || <span className="text-gray-500">Ninguno</span>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rutas disponibles en el sidebar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sidebar className="h-5 w-5" />
            Rutas Disponibles en el Sidebar
          </CardTitle>
          <CardDescription>
            Estas son las rutas que aparecerán en tu sidebar según tu rol y permisos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sidebarRoutes.map((route) => (
              <div key={route.title} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <route.icon className="h-5 w-5" />
                  <h4 className="font-medium">{route.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{route.description}</p>
                <div className="space-y-1">
                  {route.roles && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">Roles:</span>
                      {route.roles.map(role => (
                        <Badge key={role} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {route.permissions && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">Permisos:</span>
                      {route.permissions.map(permission => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verificación de acceso a rutas específicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(canAccessUsers)}
              Gestión de Usuarios
            </CardTitle>
            <CardDescription>
              Requiere: admin/manager + user.view
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(canAccessUsers)}>
              {canAccessUsers ? 'Acceso permitido' : 'Acceso denegado'}
            </Badge>
            <Button 
              className="w-full mt-2" 
              disabled={!canAccessUsers}
              onClick={() => window.location.href = '/users'}
            >
              Ir a Usuarios
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(canAccessSettings)}
              Configuración
            </CardTitle>
            <CardDescription>
              Requiere: admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(canAccessSettings)}>
              {canAccessSettings ? 'Acceso permitido' : 'Acceso denegado'}
            </Badge>
            <Button 
              className="w-full mt-2" 
              disabled={!canAccessSettings}
              onClick={() => window.location.href = '/settings'}
            >
              Ir a Configuración
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(canAccessReports)}
              Reportes
            </CardTitle>
            <CardDescription>
              Requiere: admin/manager + reports.view
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(canAccessReports)}>
              {canAccessReports ? 'Acceso permitido' : 'Acceso denegado'}
            </Badge>
            <Button 
              className="w-full mt-2" 
              disabled={!canAccessReports}
              onClick={() => window.location.href = '/reports'}
            >
              Ir a Reportes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Simulación de diferentes roles */}
      <Card>
        <CardHeader>
          <CardTitle>Simulación de Diferentes Roles</CardTitle>
          <CardDescription>
            Ejemplos de cómo se vería el sidebar con diferentes roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">👤 Usuario Normal</h4>
              <div className="space-y-1 text-sm">
                <p>✅ Dashboard</p>
                <p>❌ Usuarios</p>
                <p>❌ Configuración</p>
                <p>❌ Reportes</p>
                <p>❌ Documentación</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">👨‍💼 Manager</h4>
              <div className="space-y-1 text-sm">
                <p>✅ Dashboard</p>
                <p>✅ Usuarios (con user.view)</p>
                <p>❌ Configuración</p>
                <p>✅ Reportes (con reports.view)</p>
                <p>✅ Documentación (con docs.view)</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">👑 Admin</h4>
              <div className="space-y-1 text-sm">
                <p>✅ Dashboard</p>
                <p>✅ Usuarios</p>
                <p>✅ Configuración</p>
                <p>✅ Reportes</p>
                <p>✅ Documentación</p>
                <p>✅ Gestión de Roles</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de navegación */}
      <div className="flex justify-center gap-4">
        <Button onClick={() => window.location.href = '/c'}>
          Ir al Dashboard
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/route-protection-example'}
        >
          Ver Ejemplo de Protección
        </Button>
      </div>
    </div>
  );
};

export default SidebarProtectionExample;


