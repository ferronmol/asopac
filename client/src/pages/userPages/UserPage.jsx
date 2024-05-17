import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserInfoRequest } from "../../api/user";
import formatDate from "../../assets/formatDate";

function UserPage() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    // Función para obtener la información del usuario
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfoRequest(username);
        setUserInfo(response.data);
        console.log("Información del usuario: ", response.data);
        console.log(user);
      } catch (error) {
        console.error("Error al obtener la información del usuario: ", error);
      }
    };
    fetchUserInfo();
  }, [username]);

  return (
    <div className="container mx-auto mt-20 bg-slate-500 rounded-lg p-2">
      <h1>Página principal de mi Usuario creado</h1>
    </div>
  );
}

export default UserPage;
