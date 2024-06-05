import { useUser } from "../../context/UserContext"; // Asegúrate de importar el contexto de usuario
import { FaUserCircle } from "react-icons/fa";
import ButtonOnClik from "./ButtonOnClick";
import { useNavigate } from "react-router-dom";

const WelcomeBar = () => {
  const { user, signoutUser } = useUser(); // Obtén el usuario desde el contexto
  const navigate = useNavigate();

  if (!user) return null; // Si no hay usuario autenticado, no mostrar nada

  const handleLogout = () => {
    signoutUser();
    navigate("/association/${associationName})");
  };
  const handleEditProfile = () => {
    console.log("Editar perfil de usuario");
  };

  return (
    <div className="welcome-bar bg-orange-500 text-black p-2 flex items-center justify-between">
      <div className="flex items-center">
        <FaUserCircle className="text-2xl mr-2" />
        <span className="mr-2">Hola, {user.username}!</span>
      </div>
      <div className="flex items-center">
        <ButtonOnClik text="Editar perfil" onClick={handleEditProfile} />
        <ButtonOnClik text="Cerrar sesión" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default WelcomeBar;
