import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUserRequest } from "../api/user";

/**
 *  Componente que se encarga de cerrar la sesión del usuario
 * @returns
 */

function LogoutUserPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await logoutUserRequest();
        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.error("Error al cerrar sesión de usuario: ", error);
      }
    };
    logout();
  }, [navigate]);

  return (
    <>
      <h1 className="text-center m-5">Logout</h1>
      <h2 className="text-center">
        Estas saliendo de su perfil de usuario, esperamos verle pronto{" "}
      </h2>
    </>
  );
}

export default LogoutUserPage;
