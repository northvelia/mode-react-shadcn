import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Plus, Search, Users, MoreHorizontal } from 'lucide-react';
import PermissionGuard from '../../../components/shared/common/PermissionGuard';
import RoleBadge from '../../../components/shared/common/RoleBadge';
import { useUserPermissions } from '../../../hooks/usePermissions';


// Datos mock para demostración
const mockUsers = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'admin',
    isActive: true,
    lastLoginAt: new Date('2024-01-15'),
    createdAt: new Date('2023-06-01'),
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    role: 'manager',
    isActive: true,
    lastLoginAt: new Date('2024-01-14'),
    createdAt: new Date('2023-08-15'),
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos@example.com',
    role: 'user',
    isActive: true,
    lastLoginAt: new Date('2024-01-13'),
    createdAt: new Date('2023-10-20'),
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana@example.com',
    role: 'support',
    isActive: false,
    lastLoginAt: new Date('2024-01-10'),
    createdAt: new Date('2023-12-01'),
  },
];

// Página de gestión de usuarios
function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // const { canView, canCreate, canUpdate, canDelete } = useUserPermissions();
  
  // Usar las variables para evitar el warning de variables no utilizadas
  // console.log('User permissions:', { canView, canCreate, canUpdate, canDelete });

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Usuarios</h1>
            <p className="text-muted-foreground">
              Gestiona los usuarios del sistema
            </p>
          </div>
        </div>
        <PermissionGuard permission="user.create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </PermissionGuard>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Usuarios
          </CardTitle>
          <CardDescription>
            Filtra y busca usuarios por nombre, email o rol
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nombre, email o rol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            {searchTerm ? `Resultados para "${searchTerm}"` : 'Todos los usuarios'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length > 0 ? (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <RoleBadge role={user.role} />
                        <Badge variant={user.isActive ? "default" : "secondary"}>
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Último acceso: {user.lastLoginAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PermissionGuard permission="user.update">
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </PermissionGuard>
                    <PermissionGuard permission="user.delete">
                      <Button size="sm" variant="destructive">
                        Eliminar
                      </Button>
                    </PermissionGuard>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay usuarios para mostrar</p>
              <p className="text-sm">Los usuarios aparecerán aquí cuando se agreguen</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UsersPage;
