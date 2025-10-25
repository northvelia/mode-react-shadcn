import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, Eye, Filter } from 'lucide-react';
import { useCurrentUser } from '@/hooks/usePermissions';

const ReportsPage = () => {
  const { user } = useCurrentUser();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
          <p className="text-gray-600">Genera y visualiza reportes del sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              Reportes de Usuarios
            </CardTitle>
            <CardDescription>
              Estadísticas de usuarios registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Total usuarios: <strong>1,234</strong></p>
              <p>Nuevos este mes: <strong>89</strong></p>
              <p>Activos: <strong>1,156</strong></p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Filtros Disponibles
            </CardTitle>
            <CardDescription>
              Personaliza tus reportes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="outline">Por fecha</Badge>
              <Badge variant="outline">Por rol</Badge>
              <Badge variant="outline">Por estado</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones</CardTitle>
            <CardDescription>
              Genera y descarga reportes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full" variant="default">
                <Eye className="mr-2 h-4 w-4" />
                Ver Reporte
              </Button>
              <Button className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de Acceso</CardTitle>
          <CardDescription>
            Esta página requiere rol admin/manager y permiso reports.view
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              ✅ Tienes acceso a esta página porque tienes el rol y permisos necesarios.
            </p>
            <p className="text-blue-600 text-sm mt-2">
              Rol actual: <strong>{user?.role?.name}</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;



