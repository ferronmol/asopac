import ButtonOnClick from "./common/ButtonOnClick";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const Actions = ({ onDelete }) => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const { associationName } = useParams();

  const handleSignOut = () => {
    signout();
    navigate("/");
  };

  const handleAddInfo = () => {
    navigate(`/association/${encodeURIComponent(associationName)}/add-info`);
  };

  return (
    <div className="bg-white p-5 rounded-md  flex justify-between items-center border-2 border-orange-500">
      <ButtonOnClick
        text="Añadir Información al Perfil"
        onClick={handleAddInfo}
      />
      <ButtonOnClick text="Cerrar sesión" onClick={handleSignOut} />
      {onDelete && (
        <ButtonOnClick text="Borrar Asociación" onClick={onDelete} />
      )}
    </div>
  );
};

export default Actions;
