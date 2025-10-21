# 🏗️ Estructura del Proyecto React - Modelo Escalable

Este es un modelo/esqueleto escalable para proyectos React con las mejores prácticas de desarrollo.

## 📁 Estructura de Carpetas

```
src/
├── api/                    # Configuración de API
│   └── axiosInstance.ts
├── components/             # Componentes reutilizables
│   ├── shared/            # Componentes compartidos
│   │   ├── headers/       # Headers específicos por contexto
│   │   │   ├── AuthHeader.tsx
│   │   │   └── DashboardHeader.tsx
│   │   ├── sidebars/      # Sidebars específicos por contexto
│   │   │   └── DashboardSidebar.tsx
│   │   └── common/        # Componentes comunes
│   │       ├── ErrorBoundary.tsx
│   │       ├── Loading.tsx
│   │       └── NotFound.tsx
│   └── ui/                # Componentes de UI (shadcn/ui)
├── config/                # Configuraciones
│   └── routes.ts          # Configuración de rutas
├── features/              # Módulos de funcionalidades
│   ├── auth/              # Módulo de autenticación
│   │   ├── components/    # Componentes específicos del módulo
│   │   ├── pages/         # Páginas del módulo
│   │   ├── hooks/         # Hooks específicos
│   │   ├── api/           # API calls específicos
│   │   └── types/         # Tipos específicos
│   └── users/             # Módulo de usuarios
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── api/
│       └── types/
├── hooks/                 # Hooks globales
│   ├── useLoading.ts
│   └── useNotifications.ts
├── layouts/               # Layouts de la aplicación
│   ├── AuthLayout.tsx
│   └── DashboardLayout.tsx
├── routes/                # Configuración de rutas
│   ├── index.tsx
│   └── ProtectedRoute.tsx
├── store/                 # Estado global (Redux)
│   ├── auth/
│   ├── ui/
│   └── index.tsx
├── types/                 # Tipos globales
│   ├── auth/
│   └── ui/
└── utils/                 # Utilidades
    └── validators.ts
```

## 🎯 Principios de Diseño

### 1. **Separación por Contexto**
- `AuthHeader` vs `DashboardHeader`
- `DashboardSidebar` vs `AdminSidebar`
- Cada componente tiene un propósito específico

### 2. **Estructura de Features**
Cada feature sigue la misma estructura:
```
feature/
├── components/     # Componentes específicos
├── pages/          # Páginas del feature
├── hooks/          # Lógica de negocio
├── api/            # Llamadas a API
└── types/          # Tipos específicos
```

### 3. **Configuración Centralizada**
- Rutas en `config/routes.ts`
- Fácil agregar nuevas rutas
- Control de roles y permisos

### 4. **Manejo de Estado**
- Redux para estado global
- Hooks personalizados para lógica de negocio
- Separación clara de responsabilidades

## 🚀 Cómo Agregar Nuevas Funcionalidades

### 1. **Nuevo Feature**
```bash
mkdir src/features/nuevo-feature
mkdir src/features/nuevo-feature/{components,pages,hooks,api,types}
```

### 2. **Nueva Página**
1. Crear componente en `features/[feature]/pages/`
2. Agregar ruta en `config/routes.ts`
3. El sistema automáticamente la incluye

### 3. **Nuevo Layout**
1. Crear en `layouts/`
2. Crear componentes específicos en `components/shared/`
3. Actualizar configuración de rutas

## 🛠️ Hooks Disponibles

### `useLoading`
```typescript
const { setGlobalLoading, withLoading } = useLoading();

// Uso básico
setGlobalLoading(true);

// Uso con async
await withLoading(async () => {
  await apiCall();
});
```

### `useNotifications`
```typescript
const { showSuccess, showError, showWarning, showInfo } = useNotifications();

showSuccess('Operación exitosa');
showError('Error en la operación');
```

## 🔧 Configuración de Rutas

```typescript
// En config/routes.ts
export const protectedRoutes = [
  {
    path: '/nueva-ruta',
    element: NuevaPagina,
    title: 'Nueva Página',
    description: 'Descripción',
    icon: 'IconName',
    showInSidebar: true,
    roles: ['admin', 'manager'] // Opcional
  }
];
```

## 📝 Convenciones de Nomenclatura

### Componentes
- `PascalCase` para componentes
- Sufijo descriptivo: `DashboardHeader`, `AuthLayout`
- Específico por contexto

### Archivos
- `camelCase` para archivos
- Descriptivo: `useUsers.ts`, `userTypes.ts`

### Carpetas
- `kebab-case` para carpetas
- Descriptivo: `user-management/`

## 🎨 Mejores Prácticas

1. **Un componente por archivo**
2. **Hooks personalizados para lógica compleja**
3. **Tipos TypeScript bien definidos**
4. **Validación con Zod**
5. **Manejo de errores consistente**
6. **Loading states en todas las operaciones async**
7. **Notificaciones para feedback al usuario**

## 🔄 Flujo de Desarrollo

1. **Identificar el feature**
2. **Crear estructura de carpetas**
3. **Definir tipos TypeScript**
4. **Crear hooks de lógica**
5. **Implementar componentes**
6. **Agregar rutas**
7. **Probar y refinar**

Esta estructura te permite escalar fácilmente cualquier proyecto manteniendo la organización y las mejores prácticas.
