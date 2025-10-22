import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = () => {
    const { isAuthenticated } = useSelector((state: any) => state.auth);
    const location = useLocation();

    // Si está autenticado y se encuentra en /login, redirigir al dashboard
    if (isAuthenticated && location.pathname === "/login") {
        return <Navigate to="/c" replace />;
    }

    // En cualquier otra ruta pública, no hacer nada
    return <Outlet />;
};
