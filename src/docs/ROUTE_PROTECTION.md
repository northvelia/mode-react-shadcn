# Sistema de Protección de Rutas

Este sistema implementa un control de acceso robusto basado **SOLO en permisos** para proteger rutas de la aplicación.

## Características

- ✅ **Protección por Permisos**: Control granular basado en permisos específicos
- ✅ **Flexibilidad Total**: Los roles son solo agrupaciones de permisos
- ✅ **Página de No Autorizado**: Vista elegante cuando el acceso es denegado
- ✅ **Hooks Personalizados**: Fácil verificación en componentes
- ✅ **Configuración Declarativa**: Definición simple en el archivo de rutas
- ✅ **Escalabilidad**: Fácil agregar nuevos permisos sin cambiar roles

## Arquitectura

### Componentes Principales

1. **`PermissionRoute`**: Componente que verifica roles y permisos (usa `useRouteProtection`)
2. **`ProtectedRouteWrapper`**: Wrapper que combina Suspense, ErrorBoundary y verificación
3. **`Unauthorized`**: Página mostrada cuando el acceso es denegado
4. **`useRouteProtection`**: Hook existente para verificación programática
5. **`useRouteAccess`**: Hook existente con verificaciones predefinidas
6. **`usePermissions`**: Hooks existentes para verificación de permisos y roles
7. **`useSidebarRoutes`**: Hook existente para filtrar rutas del sidebar

### Flujo de Verificación

```
Usuario intenta acceder a ruta
    ↓
¿Está autenticado?
    ↓ NO → Redirect a /login
    ↓ SÍ
¿Tiene los permisos requeridos?
    ↓ NO → Mostrar Unauthorized
    ↓ SÍ
Mostrar contenido
```

### Filosofía del Sistema

**Los roles son solo agrupaciones de permisos.** El control real se hace a nivel de permisos:

- **Rol `user`**: Tiene permisos básicos como `user.profile.view`
- **Rol `admin`**: Tiene todos los permisos del sistema
- **Flexibilidad**: Un usuario con rol `user` puede recibir el permiso `settings.view` sin cambiar su rol
- **Escalabilidad**: Nuevos permisos se agregan sin tocar los roles existentes

## Configuración de Rutas

### Ejemplo Básico (Solo Autenticación)

```typescript
{
  path: '/dashboard',
  element: DashboardPage,
  title: 'Dashboard',
  // Sin restricciones - todos los usuarios autenticados
}
```

### Ejemplo con Permisos Simples

```typescript
{
  path: '/users',
  element: UsersPage,
  title: 'Usuarios',
  permissions: ['user.view']
}
```

### Ejemplo con Múltiples Permisos (Al menos uno)

```typescript
{
  path: '/reports',
  element: ReportsPage,
  title: 'Reportes',
  permissions: ['reports.view', 'reports.export'],
  requireAllPermissions: false // Al menos uno
}
```

### Ejemplo con Múltiples Permisos (Todos requeridos)

```typescript
{
  path: '/admin-panel',
  element: AdminPanelPage,
  title: 'Panel Admin',
  permissions: ['admin.access', 'admin.settings'],
  requireAllPermissions: true // Todos requeridos
}
```

### Ejemplo de Flexibilidad

```typescript
// Un usuario con rol 'user' puede ver settings si tiene el permiso
{
  path: '/settings',
  element: SettingsPage,
  title: 'Configuración',
  permissions: ['settings.view']
  // No importa el rol, solo el permiso
}
```

## Uso en Componentes

### Hook useRouteProtection

```typescript
import { useRouteProtection } from '@/hooks/useRouteProtection';

const MyComponent = () => {
  const { canAccess, reason, message } = useRouteProtection({
    permissions: ['user.view'],
    requireAllPermissions: false
  });

  if (!canAccess) {
    return <div>No tienes acceso: {message}</div>;
  }

  return <div>Contenido protegido</div>;
};
```

### Hook useRouteAccess

```typescript
import { useRouteAccess } from '@/hooks/useRouteProtection';

const Navigation = () => {
  const { canAccessUsers, canAccessSettings } = useRouteAccess();

  return (
    <nav>
      {canAccessUsers && <Link to="/users">Usuarios</Link>}
      {canAccessSettings && <Link to="/settings">Configuración</Link>}
    </nav>
  );
};
```

### Componente PermissionRoute

```typescript
import PermissionRoute from '@/components/shared/common/PermissionRoute';

const ProtectedContent = () => (
  <PermissionRoute
    permissions={['user.view']}
    requireAllPermissions={false}
  >
    <div>Contenido solo para administradores con permiso user.view</div>
  </PermissionRoute>
);
```

## Opciones de Configuración

### Roles
- **`roles`**: Array de roles permitidos
- **Comportamiento**: Usuario debe tener AL MENOS UNO de los roles

### Permisos
- **`permissions`**: Array de permisos requeridos
- **`requireAllPermissions`**: 
  - `false` (default): Usuario debe tener AL MENOS UNO de los permisos
  - `true`: Usuario debe tener TODOS los permisos

### Combinación
- Si se especifican **roles** y **permisos**: Usuario debe cumplir AMBOS
- Si solo se especifican **roles**: Solo verifica roles
- Si solo se especifican **permisos**: Solo verifica permisos
- Si no se especifica nada: Solo requiere autenticación

## Página de No Autorizado

Cuando el acceso es denegado, se muestra la página `Unauthorized` que incluye:

- ✅ Mensaje claro de "Acceso No Autorizado"
- ✅ Botón para volver atrás
- ✅ Botón para ir al dashboard
- ✅ Diseño elegante y profesional

## Ejemplos Prácticos

### 1. Dashboard (Acceso General)
```typescript
{
  path: '/dashboard',
  element: DashboardPage,
  // Sin restricciones
}
```

### 2. Gestión de Usuarios (Admin/Manager + Permiso)
```typescript
{
  path: '/users',
  element: UsersPage,
  roles: ['admin', 'manager'],
  permissions: ['user.view']
}
```

### 3. Configuración (Solo Admin)
```typescript
{
  path: '/settings',
  element: SettingsPage,
  roles: ['admin']
}
```

### 4. Reportes Avanzados (Múltiples Permisos)
```typescript
{
  path: '/reports',
  element: ReportsPage,
  roles: ['admin', 'manager'],
  permissions: ['reports.view', 'reports.export'],
  requireAllPermissions: false // Al menos uno
}
```

## Uso de Hooks Existentes

### Verificación Programática en Componentes

```typescript
import { useRouteProtection, useRouteAccess } from '@/hooks/useRouteProtection';
import { useHasPermission, useHasRole, useIsAdmin } from '@/hooks/usePermissions';
import { useSidebarRoutes, useCanAccessRoute } from '@/hooks/useSidebarRoutes';

// Verificación básica de acceso
const MyComponent = () => {
  
  const { canAccess, reason, message } = useRouteProtection({
    roles: ['admin', 'manager'],
    permissions: ['user.view']
  });

  if (!canAccess) {
    return <div>No tienes acceso: {message}</div>;
  }

  return <div>Contenido protegido</div>;
};

// Verificación de permisos específicos
const UserActions = () => {
  const canCreate = useHasPermission('user.create');
  const canDelete = useHasPermission('user.delete');
  const isAdmin = useIsAdmin();

  return (
    <div>
      {canCreate && <button>Crear Usuario</button>}
      {canDelete && <button>Eliminar Usuario</button>}
      {isAdmin && <button>Configuración Avanzada</button>}
    </div>
  );
};

// Verificación de acceso a rutas específicas
const Navigation = () => {
  const canAccessUsers = useCanAccessRoute('/users');
  const canAccessReports = useCanAccessRoute('/reports');

  return (
    <nav>
      {canAccessUsers && <Link to="/users">Usuarios</Link>}
      {canAccessReports && <Link to="/reports">Reportes</Link>}
    </nav>
  );
};
```

### Hooks de Acceso Predefinidos

```typescript
import { useRouteAccess } from '@/hooks/useRouteProtection';

const Dashboard = () => {
  const { 
    canAccessDashboard, 
    canAccessUsers, 
    canAccessSettings, 
    canAccessReports 
  } = useRouteAccess();

  return (
    <div>
      {canAccessDashboard && <DashboardWidget />}
      {canAccessUsers && <UsersWidget />}
      {canAccessSettings && <SettingsWidget />}
      {canAccessReports && <ReportsWidget />}
    </div>
  );
};
```

## Ventajas del Sistema

1. **Flexibilidad Total**: Solo permisos, sin restricciones de roles
2. **Seguridad**: Verificación granular a nivel de permisos
3. **UX**: Página elegante para acceso denegado
4. **Mantenibilidad**: Configuración declarativa simple
5. **Reutilización**: Hooks y componentes reutilizables
6. **Performance**: Verificaciones optimizadas con useMemo
7. **Escalabilidad**: Fácil agregar nuevos permisos sin tocar roles
8. **Consistencia**: Usa la lógica existente de permisos

## Recomendaciones

1. **Prioriza permisos sobre roles** - Los roles son solo agrupaciones
2. **Define permisos específicos por módulo** (user.*, reports.*, settings.*, etc.)
3. **Usa requireAllPermissions: true solo cuando sea necesario**
4. **Agrupa permisos relacionados** (user.view, user.create, user.update, user.delete)
5. **Documenta los permisos disponibles** para facilitar la gestión

