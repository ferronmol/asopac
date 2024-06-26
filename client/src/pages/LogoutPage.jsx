import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../api/auth";

/**
 *  Componente que se encarga de cerrar la sesión del usuario
 * @returns
 */

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await logoutRequest();
        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.error("Error al cerrar sesión de Asociación: ", error);
      }
    };
    logout();
  }, [navigate]);

  return (
    <>
      <h1 className="text-center m-5">Logout</h1>
      <h2 className="text-center">
        Estas saliendo de la asociación, esperamos verte pronto{" "}
      </h2>
    </>
  );
}

export default LogoutPage;
