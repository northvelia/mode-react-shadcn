import { useRouteProtection, useRouteAccess } from '@/hooks/useRouteProtection';
import { useCurrentUser } from '@/hooks/usePermissions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const RouteProtectionExample = () => {
  const { user, isAuthenticated } = useCurrentUser();
  const routeAccess = useRouteAccess();
  
  // Ejemplos de verificación de acceso a rutas específicas
  const dashboardAccess = useRouteProtection({});
  const usersAccess = useRouteProtection({ 
    permissions: ['user.view'] 
  });
  const settingsAccess = useRouteProtection({ 
    permissions: ['settings.view'] 
  });
  const complexAccess = useRouteProtection({ 
    permissions: ['user.view', 'user.create'], 
    requireAllPermissions: false 
  });

  const getStatusIcon = (canAccess: boolean) => {
    return canAccess ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getStatusColor = (canAccess: boolean) => {
    return canAccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Ejemplo de Protección de Rutas</h1>
        <p className="text-gray-600 mt-2">
          Sistema de protección basado en roles y permisos
        </p>
      </div>

      {/* Información del usuario actual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Usuario Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Autenticado:</strong> {isAuthenticated ? 'Sí' : 'No'}</p>
            {user && (
              <>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> 
                  <Badge variant="secondary" className="ml-2">
                    {user.role?.name || 'Sin rol'}
                  </Badge>
                </p>
                <p><strong>Permisos del rol:</strong> 
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.role?.permissions?.map(permission => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    )) || <span className="text-gray-500">Ninguno</span>}
                  </div>
                </p>
                <p><strong>Permisos personalizados:</strong> 
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.permissions?.map(permission => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    )) || <span className="text-gray-500">Ninguno</span>}
                  </div>
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Verificaciones de acceso a rutas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(dashboardAccess.canAccess)}
              Dashboard
            </CardTitle>
            <CardDescription>
              Acceso básico al dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge className={getStatusColor(dashboardAccess.canAccess)}>
                {dashboardAccess.canAccess ? 'Acceso permitido' : 'Acceso denegado'}
              </Badge>
              <p className="text-sm text-gray-600">{dashboardAccess.message}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(usersAccess.canAccess)}
              Gestión de Usuarios
            </CardTitle>
            <CardDescription>
              Requiere permiso user.view
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge className={getStatusColor(usersAccess.canAccess)}>
                {usersAccess.canAccess ? 'Acceso permitido' : 'Acceso denegado'}
              </Badge>
              <p className="text-sm text-gray-600">{usersAccess.message}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(settingsAccess.canAccess)}
              Configuración
            </CardTitle>
            <CardDescription>
              Requiere permiso settings.view
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge className={getStatusColor(settingsAccess.canAccess)}>
                {settingsAccess.canAccess ? 'Acceso permitido' : 'Acceso denegado'}
              </Badge>
              <p className="text-sm text-gray-600">{settingsAccess.message}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(complexAccess.canAccess)}
              Acceso Complejo
            </CardTitle>
            <CardDescription>
              Permisos user.view O user.create (al menos uno)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge className={getStatusColor(complexAccess.canAccess)}>
                {complexAccess.canAccess ? 'Acceso permitido' : 'Acceso denegado'}
              </Badge>
              <p className="text-sm text-gray-600">{complexAccess.message}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acceso a rutas del sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Acceso a Rutas del Sistema</CardTitle>
          <CardDescription>
            Verificación de acceso usando el hook useRouteAccess
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {getStatusIcon(routeAccess.canAccessDashboard)}
              </div>
              <p className="font-medium">Dashboard</p>
              <Badge className={getStatusColor(routeAccess.canAccessDashboard)}>
                {routeAccess.canAccessDashboard ? 'Sí' : 'No'}
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {getStatusIcon(routeAccess.canAccessUsers)}
              </div>
              <p className="font-medium">Usuarios</p>
              <Badge className={getStatusColor(routeAccess.canAccessUsers)}>
                {routeAccess.canAccessUsers ? 'Sí' : 'No'}
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {getStatusIcon(routeAccess.canAccessRoles)}
              </div>
              <p className="font-medium">Roles</p>
              <Badge className={getStatusColor(routeAccess.canAccessRoles)}>
                {routeAccess.canAccessRoles ? 'Sí' : 'No'}
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {getStatusIcon(routeAccess.canAccessReports)}
              </div>
              <p className="font-medium">Reportes</p>
              <Badge className={getStatusColor(routeAccess.canAccessReports)}>
                {routeAccess.canAccessReports ? 'Sí' : 'No'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de navegación */}
      <div className="flex justify-center gap-4">
        <Button 
          onClick={() => window.location.href = '/c'}
          disabled={!routeAccess.canAccessDashboard}
        >
          Ir al Dashboard
        </Button>
        <Button 
          onClick={() => window.location.href = '/users'}
          disabled={!routeAccess.canAccessUsers}
          variant="outline"
        >
          Ir a Usuarios
        </Button>
        <Button 
          onClick={() => window.location.href = '/settings'}
          disabled={!routeAccess.canAccessSettings}
          variant="outline"
        >
          Ir a Configuración
        </Button>
      </div>
    </div>
  );
};

export default RouteProtectionExample;

