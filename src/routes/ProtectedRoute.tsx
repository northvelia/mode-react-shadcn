
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';


function ProtectedRoute() {
  //const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { isAuthenticated, initialized } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!initialized) {
    return null;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />;
}

export default ProtectedRoute;