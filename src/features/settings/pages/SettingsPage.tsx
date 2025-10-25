import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, Shield, Database, Mail } from 'lucide-react';
import { useCurrentUser } from '@/hooks/usePermissions';

const SettingsPage = () => {
  const { user } = useCurrentUser();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600">Configuración avanzada del sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Seguridad
            </CardTitle>
            <CardDescription>
              Configuración de seguridad del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Autenticación de dos factores</span>
                <Badge variant="outline">Desactivado</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Política de contraseñas</span>
                <Badge variant="default">Activo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Sesión automática</span>
                <Badge variant="outline">Desactivado</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-600" />
              Base de Datos
            </CardTitle>
            <CardDescription>
              Configuración de la base de datos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Backup automático</span>
                <Badge variant="default">Activo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Límite de conexiones</span>
                <Badge variant="outline">100</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Timeout de consultas</span>
                <Badge variant="outline">30s</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              Notificaciones
            </CardTitle>
            <CardDescription>
              Configuración de notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Email de alertas</span>
                <Badge variant="default">Activo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Notificaciones push</span>
                <Badge variant="outline">Desactivado</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones</CardTitle>
            <CardDescription>
              Gestiona la configuración del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full" variant="default">
                Guardar Cambios
              </Button>
              <Button className="w-full" variant="outline">
                Restaurar Valores
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acceso Restringido</CardTitle>
          <CardDescription>
            Esta página solo es accesible para administradores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              🔒 Esta es una página de configuración crítica que solo los administradores pueden acceder.
            </p>
            <p className="text-red-600 text-sm mt-2">
              Rol actual: <strong>{user?.role?.name}</strong> - Acceso autorizado
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;


