# Sistema de Protección del Sidebar

Este sistema implementa un control de acceso dinámico para el sidebar que se adapta automáticamente según los roles y permisos del usuario.

## Características

- ✅ **Sidebar Dinámico**: Se adapta automáticamente según el usuario
- ✅ **Protección por Roles**: Control de acceso basado en roles
- ✅ **Protección por Permisos**: Control granular basado en permisos
- ✅ **Mantenible**: Fácil agregar/quitar rutas
- ✅ **Extensible**: Sistema escalable para nuevas funcionalidades
- ✅ **Hooks Personalizados**: Fácil verificación en componentes

## Arquitectura

### Componentes Principales

1. **`useSidebarRoutes`**: Hook que filtra rutas según roles/permisos
2. **`useCanAccessRoute`**: Hook para verificar acceso a rutas específicas
3. **`useRouteInfo`**: Hook para obtener información de rutas
4. **`DashboardSidebar`**: Componente del sidebar actualizado

### Flujo de Funcionamiento

```
Usuario se autentica
    ↓
useSidebarRoutes verifica roles/permisos
    ↓
Filtra rutas disponibles
    ↓
Sidebar muestra solo rutas permitidas
```

## Configuración de Rutas

### Estructura de una Ruta

```typescript
interface SidebarRoute {
  title: string;           // Título visible
  url: string;            // URL de la ruta
  icon: any;              // Icono de Lucide
  roles?: string[];       // Roles permitidos
  permissions?: string[]; // Permisos requeridos
  requireAllPermissions?: boolean; // Requiere todos los permisos
  description?: string;   // Descripción para tooltip
}
```

### Ejemplos de Configuración

#### 1. Ruta Pública (Solo Autenticación)
```typescript
{
  title: 'Dashboard',
  url: '/c',
  icon: Home,
  description: 'Panel principal'
  // Sin restricciones adicionales
}
```

#### 2. Ruta con Roles
```typescript
{
  title: 'Configuración',
  url: '/settings',
  icon: Settings,
  roles: ['admin'],
  description: 'Configuración del sistema'
}
```

#### 3. Ruta con Permisos
```typescript
{
  title: 'Usuarios',
  url: '/users',
  icon: Users,
  permissions: ['user.view'],
  description: 'Gestión de usuarios'
}
```

#### 4. Ruta Completa (Roles + Permisos)
```typescript
{
  title: 'Reportes',
  url: '/reports',
  icon: BarChart3,
  roles: ['admin', 'manager'],
  permissions: ['reports.view'],
  requireAllPermissions: false,
  description: 'Reportes del sistema'
}
```

## Rutas Implementadas

### Rutas Básicas para Demostración

1. **Dashboard** (`/c`)
   - Acceso: Todos los usuarios autenticados
   - Sin restricciones adicionales

2. **Usuarios** (`/users`)
   - Acceso: admin/manager + user.view
   - Gestión de usuarios del sistema

3. **Gestión de Roles** (`/roles`)
   - Acceso: admin + role.view
   - Administrar roles y permisos

4. **Reportes** (`/reports`)
   - Acceso: admin/manager + reports.view
   - Reportes del sistema

5. **Configuración** (`/settings`)
   - Acceso: admin
   - Configuración avanzada del sistema

6. **Documentación** (`/docs`)
   - Acceso: admin/manager + docs.view
   - Documentación técnica

7. **Ejemplo Protección** (`/route-protection-example`)
   - Acceso: admin/manager + dashboard.view
   - Demostración de protección de rutas

8. **Ejemplo Sidebar** (`/sidebar-protection-example`)
   - Acceso: admin/manager + dashboard.view
   - Demostración de protección del sidebar

## Uso en Componentes

### Hook useSidebarRoutes

```typescript
import { useSidebarRoutes } from '@/hooks/useSidebarRoutes';

const MyComponent = () => {
  const sidebarRoutes = useSidebarRoutes();
  
  return (
    <div>
      {sidebarRoutes.map(route => (
        <div key={route.title}>
          {route.title} - {route.description}
        </div>
      ))}
    </div>
  );
};
```

### Hook useCanAccessRoute

```typescript
import { useCanAccessRoute } from '@/hooks/useSidebarRoutes';

const Navigation = () => {
  const canAccessUsers = useCanAccessRoute('/users');
  const canAccessSettings = useCanAccessRoute('/settings');

  return (
    <nav>
      {canAccessUsers && <Link to="/users">Usuarios</Link>}
      {canAccessSettings && <Link to="/settings">Configuración</Link>}
    </nav>
  );
};
```

### Hook useRouteInfo

```typescript
import { useRouteInfo } from '@/hooks/useSidebarRoutes';

const RouteDetails = () => {
  const routeInfo = useRouteInfo('/users');
  
  if (routeInfo) {
    return <div>Ruta: {routeInfo.title}</div>;
  }
  
  return <div>Ruta no encontrada</div>;
};
```

## Ventajas del Sistema

### 1. **Mantenibilidad**
- Configuración centralizada en `useSidebarRoutes`
- Fácil agregar/quitar rutas
- Cambios en un solo lugar

### 2. **Extensibilidad**
- Fácil agregar nuevas rutas
- Soporte para nuevos roles y permisos
- Sistema escalable

### 3. **Seguridad**
- Verificación automática de acceso
- No se pueden acceder rutas no autorizadas
- Control granular con permisos

### 4. **UX Mejorada**
- Sidebar se adapta automáticamente
- Solo muestra opciones relevantes
- Tooltips informativos

### 5. **Performance**
- Verificaciones optimizadas con useMemo
- Filtrado eficiente de rutas
- Carga lazy de componentes

## Ejemplos de Comportamiento

### Usuario Normal
```
Sidebar muestra:
✅ Dashboard
❌ Usuarios (sin rol admin/manager)
❌ Configuración (sin rol admin)
❌ Reportes (sin permisos)
❌ Documentación (sin permisos)
```

### Manager
```
Sidebar muestra:
✅ Dashboard
✅ Usuarios (con user.view)
❌ Configuración (sin rol admin)
✅ Reportes (con reports.view)
✅ Documentación (con docs.view)
```

### Admin
```
Sidebar muestra:
✅ Dashboard
✅ Usuarios
✅ Configuración
✅ Reportes
✅ Documentación
✅ Gestión de Roles
```

## Mejores Prácticas

1. **Usa roles para control general** (admin, manager, user)
2. **Usa permisos para control granular** (user.view, reports.export, etc.)
3. **Combina ambos para máxima flexibilidad**
4. **Define permisos específicos por módulo** (user.*, reports.*, etc.)
5. **Usa requireAllPermissions: true solo cuando sea necesario**
6. **Mantén la configuración centralizada**
7. **Documenta los permisos requeridos**

## Extensión del Sistema

### Agregar Nueva Ruta

1. **Crear la página** en `src/features/[module]/pages/`
2. **Agregar a useSidebarRoutes** en `src/hooks/useSidebarRoutes.ts`
3. **Configurar roles/permisos** según necesidades
4. **Agregar a routes.ts** si es necesario

### Ejemplo de Nueva Ruta

```typescript
// En useSidebarRoutes.ts
{
  title: 'Inventario',
  url: '/inventory',
  icon: Package,
  roles: ['admin', 'manager'],
  permissions: ['inventory.view'],
  description: 'Gestión de inventario'
}
```

## Conclusión

Este sistema proporciona:

- ✅ **Control de acceso dinámico** en el sidebar
- ✅ **Fácil mantenimiento** y extensión
- ✅ **Seguridad robusta** con roles y permisos
- ✅ **Excelente UX** con sidebar adaptativo
- ✅ **Performance optimizada** con hooks eficientes

El sistema es completamente **mantenible** y **extensible**, permitiendo agregar nuevas rutas y funcionalidades sin afectar el código existente.


