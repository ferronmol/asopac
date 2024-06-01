import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import {
  getAssociationInfoRequest,
  deleteAssociationRequest,
} from "../api/association";
import { useEffect, useState } from "react";
import Actions from "../components/Actions";
import AssociationInfo from "../components/AssociationInfo";

function AssociationPage() {
  const { associationName } = useParams();
  //console.log("Nombre de la asociación: ", associationName);
  const [asociacionInfo, setAsociacionInfo] = useState(null);
  const { asociacion, isAuthenticated } = useAuth();

  useEffect(() => {
    // Función para obtener la información de la asociación
    const fetchAssociationInfo = async () => {
      try {
        const response = await getAssociationInfoRequest(associationName);
        setAsociacionInfo(response.data);
        console.log("Información de la asociación: ", response.data);
        console.log(asociacion);
      } catch (error) {
        console.error(
          "Error al obtener la información de la asociación: ",
          error
        );
        //redirigir a la página de error
        window.location.href = "/"; //provisional
      }
    };
    fetchAssociationInfo();
  }, [associationName]);

  /**
   * Función para borrar una asociación
   * @param {String} associationId - Id de la asociación
   * @returns
   */

  const handleDelete = async () => {
    try {
      const response = await deleteAssociationRequest(asociacion.id);
      console.log("Respuesta de la API al borrar la asociación: ", response);
      if (response.status === 200) {
        console.log("Asociación borrada correctamente");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error al borrar la asociación: ", error);
    }
  };

  const additionalInfo = isAuthenticated
    ? {
        id: asociacion.id,
        createdAt: asociacion.createdAt,
        updatedAt: asociacion.updatedAt,
      }
    : null;

  return (
    <div className="flex-1 p-2">
      {isAuthenticated && <Actions onDelete={handleDelete} />}
      <div className="container mx-auto mt-2 bg-slate-500 rounded-lg p-2">
        <h1 className="text-center mt-2">
          BIENVENIDO A <span className="text-xl">{associationName} </span>
        </h1>
        <AssociationInfo
          info={asociacionInfo}
          isAuthenticated={isAuthenticated}
          additionalInfo={additionalInfo}
        />
      </div>
    </div>
  );
}

export default AssociationPage;
