import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserInfoRequest } from "../../api/user";
import ButtonLink from "../../components/common/ButtonLink";

function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const { user: userContext, isAuthenticated } = useUser();
  console.log("Usuario del contexto: ", userContext);
  useEffect(() => {
    // Función para obtener la información del usuario
    const fetchUserInfo = async () => {
      try {
        const username = userContext.username;
        const response = await getUserInfoRequest(username);
        console.log(response.data);
        setUser(response.data);
        console.log("Información del usuario: ", response.data);
        console.log(user);
      } catch (error) {
        console.error("Error al obtener la información del usuario: ", error);
      }
    };
    fetchUserInfo();
  }, [username]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto mt-20 bg-slate-500 rounded-lg p-2">
        <h1>Usuario no autenticado</h1>

        <ButtonLink text="Iniciar sesión" to="/users/login" />
      </div>
    );
  }
  console.log("Esta en perfil privado", user);

  return (
    <div className="container mx-auto mt-20 bg-slate-500 rounded-lg p-2">
      <h1 className="text-center mt-5">
        Bienvenido a tu perfil, {""}
        <span className="text-red-700 p-4 bg-orange-400 rounded-sm">
          {userContext.username}
        </span>
      </h1>
      <div className="bg-gray-500 p-5 rounded-md">
        {user && (
          <>
            <h3 className="ml-5 text-lg bg-orange-600 p-2 rounded-md mt-2">
              Información del Usuario:
            </h3>
            <div className="font-semibold text-lg text-gray-200">
              <ul className="list-disc ml-10 mt-2">
                <li>Nombre: {userContext.username}</li>
                <li>
                  Mail: {userContext.email} {"  "}
                  {userContext.emailVerified ? "✅" : "❌"}
                </li>
                <li>Fecha de creación: {userContext.createdAt}</li>
                <li>Última conexión: {userContext.lastConnection}</li>
                <li>
                  Rol:{" "}
                  {userContext.role === "admin" ? "Administrador" : "Usuario"}
                </li>
                <li>
                  Asociaciones inscritas:
                  <ul>{userContext.associations}</ul>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="bg-white p-5 rounded-md mt-5">
        <h3 className="ml-5 text-lg bg-orange-600 p-2 rounded-md mt-2">
          Acciones:
        </h3>
        <div className="font-semibold text-lg text-gray-200">
          <ul className="list-disc ml-10 mt-2">
            <li>
              <ButtonLink text="Editar perfil " to="/users/edit" type="link" />
            </li>
            <li>
              <ButtonLink text="Cerrar sesión" to="/" type="link" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
