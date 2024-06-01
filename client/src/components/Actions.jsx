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

  const handleDelete = () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas borrar esta asociación?"
    );
    if (confirmed && onDelete) {
      onDelete()
        .then(() => {
          signout(); // Cerrar sesión y borrar cookies
          navigate("/"); // Redirigir a la página de inicio
        })
        .catch((error) => {
          console.error("Error al borrar la asociación:", error);
        });
    }
  };

  return (
    <div className="bg-white p-5 rounded-md flex justify-between items-center border-2 border-orange-500">
      <ButtonOnClick
        text="Añadir Información al Perfil"
        onClick={handleAddInfo}
      />
      <ButtonOnClick text="Cerrar sesión" onClick={handleSignOut} />
      {onDelete && (
        <ButtonOnClick text="Borrar Asociación" onClick={handleDelete} />
      )}
    </div>
  );
};

export default Actions;
