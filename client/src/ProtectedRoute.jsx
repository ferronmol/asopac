import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Componente que protege las rutas de la aplicación
 * @returns {JSX.Element}
 */

function ProtectedRoute() {
  const { isAuthenticated, asociacion } = useAuth();
  console.log("La autenticación es: ", isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/association/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
