import ButtonOnClick from "./common/ButtonOnClick";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Actions = ({ onDelete }) => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout();
    navigate("/");
  };

  return (
    <div className="bg-white p-5 rounded-md m-10 flex justify-between items-center border-2 border-orange-500">
      <ButtonOnClick
        text="Añadir Información al Perfil"
        onClick={() => {
          /* Lógica para añadir información al perfil */
        }}
      />
      <ButtonOnClick text="Cerrar sesión" onClick={handleSignOut} />
      (onDelete && (
      <ButtonOnClick text="Borrar Asociación" onClick={onDelete} />
      ))
    </div>
  );
};

export default Actions;
