import { Suspense } from 'react';
import { useRouteProtection } from '@/hooks/useRouteProtection';
import Loading from '../Loading';
import ErrorBoundary from './ErrorBoundary';

interface ProtectedRouteWrapperProps {
  children: React.ReactNode;
  permissions?: string[];
  requireAllPermissions?: boolean;
}

/**
 * Wrapper que combina Suspense, ErrorBoundary y verificación SOLO de permisos
 * BASADO EN PERMISOS - Los roles son solo agrupaciones de permisos
 */
const ProtectedRouteWrapper = ({
  children,
  permissions = [],
  requireAllPermissions = false
}: ProtectedRouteWrapperProps) => {
  const { canAccess } = useRouteProtection({
    permissions,
    requireAllPermissions
  });

  // Si no puede acceder, no mostrar nada
  if (!canAccess) {
    return null;
  }

  // Si puede acceder, mostrar con Suspense y ErrorBoundary
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

export default ProtectedRouteWrapper;

