import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("Autenticado cambiado:", isAuthenticated);
  }, [isAuthenticated]);
  console.log(loading, isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/association/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
