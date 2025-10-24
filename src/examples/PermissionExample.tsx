import { Button } from '@/components/ui/button';
import PermissionGuard from '@/components/shared/common/PermissionGuard';
import { useHasPermission, useUserPermissions, useIsAdmin } from '@/hooks/usePermissions';

/**
 * Ejemplo de uso del sistema de permisos simplificado
 */
function PermissionExample() {
  // Hooks simples
  const canCreateUsers = useHasPermission('user.create');
  const isAdmin = useIsAdmin();
  const { canView, canCreate, canUpdate, canDelete } = useUserPermissions();

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Ejemplo de Permisos Simples</h1>

      {/* Ejemplo 1: Botón condicional */}
      <div>
        <h2 className="text-lg font-semibold mb-2">1. Botón Condicional</h2>
        {canCreateUsers && (
          <Button>Crear Usuario</Button>
        )}
      </div>

      {/* Ejemplo 2: PermissionGuard con permiso individual */}
      <div>
        <h2 className="text-lg font-semibold mb-2">2. PermissionGuard - Permiso Individual</h2>
        <PermissionGuard permission="user.view">
          <div className="p-4 bg-green-100 border border-green-300 rounded">
            ✅ Puedes ver usuarios
          </div>
        </PermissionGuard>
      </div>

      {/* Ejemplo 3: PermissionGuard con múltiples permisos */}
      <div>
        <h2 className="text-lg font-semibold mb-2">3. PermissionGuard - Múltiples Permisos</h2>
        <PermissionGuard permissions={['user.create', 'user.update']}>
          <div className="p-4 bg-blue-100 border border-blue-300 rounded">
            ✅ Puedes crear o editar usuarios
          </div>
        </PermissionGuard>
      </div>

      {/* Ejemplo 4: PermissionGuard con roles */}
      <div>
        <h2 className="text-lg font-semibold mb-2">4. PermissionGuard - Roles</h2>
        <PermissionGuard roles={['admin', 'manager']}>
          <div className="p-4 bg-purple-100 border border-purple-300 rounded">
            ✅ Eres administrador o gerente
          </div>
        </PermissionGuard>
      </div>

      {/* Ejemplo 5: PermissionGuard con módulo */}
      <div>
        <h2 className="text-lg font-semibold mb-2">5. PermissionGuard - Módulo</h2>
        <PermissionGuard module="users">
          <div className="p-4 bg-orange-100 border border-orange-300 rounded">
            ✅ Tienes acceso al módulo de usuarios
          </div>
        </PermissionGuard>
      </div>

      {/* Ejemplo 6: Con fallback */}
      <div>
        <h2 className="text-lg font-semibold mb-2">6. PermissionGuard - Con Fallback</h2>
        <PermissionGuard 
          permission="user.delete" 
          showFallback={true}
          fallback={
            <div className="p-4 bg-red-100 border border-red-300 rounded">
              ❌ No tienes permisos para eliminar usuarios
            </div>
          }
        >
          <div className="p-4 bg-green-100 border border-green-300 rounded">
            ✅ Puedes eliminar usuarios
          </div>
        </PermissionGuard>
      </div>

      {/* Ejemplo 7: Información del usuario */}
      <div>
        <h2 className="text-lg font-semibold mb-2">7. Información del Usuario</h2>
        <div className="p-4 bg-gray-100 border rounded">
          <p><strong>Es Admin:</strong> {isAdmin ? 'Sí' : 'No'}</p>
          <p><strong>Puede ver usuarios:</strong> {canView ? 'Sí' : 'No'}</p>
          <p><strong>Puede crear usuarios:</strong> {canCreate ? 'Sí' : 'No'}</p>
          <p><strong>Puede editar usuarios:</strong> {canUpdate ? 'Sí' : 'No'}</p>
          <p><strong>Puede eliminar usuarios:</strong> {canDelete ? 'Sí' : 'No'}</p>
        </div>
      </div>

      {/* Ejemplo 8: Lista de usuarios con permisos */}
      <div>
        <h2 className="text-lg font-semibold mb-2">8. Lista de Usuarios</h2>
        <div className="space-y-2">
          {['Usuario 1', 'Usuario 2', 'Usuario 3'].map((user, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <span>{user}</span>
              <div className="flex gap-2">
                <PermissionGuard permission="user.update">
                  <Button size="sm" variant="outline">Editar</Button>
                </PermissionGuard>
                <PermissionGuard permission="user.delete">
                  <Button size="sm" variant="destructive">Eliminar</Button>
                </PermissionGuard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PermissionExample;
