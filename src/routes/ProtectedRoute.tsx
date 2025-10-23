
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useLoading } from '@/hooks/useLoading';
import Loading from '@/components/shared/Loading';


function ProtectedRoute() {
  //const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { isAuthenticated, initialized } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const { setGlobalLoading } = useLoading();
  if (!initialized) {
    setGlobalLoading(true);
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />;
}

export default ProtectedRoute;