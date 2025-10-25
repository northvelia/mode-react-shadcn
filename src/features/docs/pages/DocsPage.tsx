import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, Code, Shield } from 'lucide-react';
import { useCurrentUser } from '@/hooks/usePermissions';

const DocsPage = () => {
  const { user } = useCurrentUser();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documentación</h1>
          <p className="text-gray-600">Documentación técnica del sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Guías de Usuario
            </CardTitle>
            <CardDescription>
              Documentación para usuarios finales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Guía de Inicio
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Gestión de Usuarios
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Configuración
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              API Documentation
            </CardTitle>
            <CardDescription>
              Documentación de la API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Endpoints
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Autenticación
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Ejemplos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Seguridad
            </CardTitle>
            <CardDescription>
              Documentación de seguridad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Roles y Permisos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Protección de Rutas
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Mejores Prácticas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documentación Técnica</CardTitle>
          <CardDescription>
            Esta sección contiene documentación técnica avanzada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Arquitectura del Sistema</h4>
                <p className="text-sm text-gray-600">
                  Documentación sobre la arquitectura y diseño del sistema de protección de rutas.
                </p>
                <Badge variant="outline">Técnico</Badge>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Implementación</h4>
                <p className="text-sm text-gray-600">
                  Guías paso a paso para implementar nuevas funcionalidades.
                </p>
                <Badge variant="outline">Desarrollo</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acceso Verificado</CardTitle>
          <CardDescription>
            Esta página requiere rol admin/manager y permiso docs.view
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              ✅ Tienes acceso a la documentación técnica porque tienes los permisos necesarios.
            </p>
            <p className="text-green-600 text-sm mt-2">
              Rol actual: <strong>{user?.role?.name}</strong> - Permisos: <strong>docs.view</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocsPage;



