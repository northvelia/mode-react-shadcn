import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCog, Shield, Users } from 'lucide-react';
import { useCurrentUser } from '@/hooks/usePermissions';

const RolesPage = () => {
  const { user } = useCurrentUser();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <UserCog className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Roles</h1>
          <p className="text-gray-600">Administra roles y permisos del sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Roles del Sistema
            </CardTitle>
            <CardDescription>
              Gestiona los roles disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="default">Admin</Badge>
              <Badge variant="secondary">Manager</Badge>
              <Badge variant="outline">User</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Permisos
            </CardTitle>
            <CardDescription>
              Configura permisos específicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p>• user.view</p>
              <p>• user.create</p>
              <p>• user.update</p>
              <p>• user.delete</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usuario Actual</CardTitle>
            <CardDescription>
              Información de tu rol actual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Rol:</strong> {user?.role?.name || 'Sin rol'}</p>
              <p><strong>Permisos:</strong></p>
              <div className="flex flex-wrap gap-1">
                {user?.role?.permissions?.map(permission => (
                  <Badge key={permission} variant="outline" className="text-xs">
                    {permission}
                  </Badge>
                )) || <span className="text-gray-500">Ninguno</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acceso Verificado</CardTitle>
          <CardDescription>
            Esta página solo es visible para administradores con permiso role.view
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              ✅ Tienes acceso a esta página porque eres administrador y tienes los permisos necesarios.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolesPage;

