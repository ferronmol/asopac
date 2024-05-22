import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { getAssociationInfoRequest } from "../api/association";
import { useEffect, useState } from "react";
import AssociationHeader from "../components/AssociationHeader";
import Actions from "../components/Actions";
import AssociationInfo from "../components/AssociationInfo";

function AssociationPage() {
  const { associationName } = useParams();
  const [asociacionInfo, setAsociacionInfo] = useState(null);
  const { asociacion, isAuthenticated } = useAuth();

  useEffect(() => {
    // Función para obtener la información de la asociación
    const fetchAssociationInfo = async () => {
      try {
        const response = await getAssociationInfoRequest(associationName);
        setAsociacionInfo(response.data);
        //console.log("Información de la asociación: ", response.data);
        //console.log(asociacion);
      } catch (error) {
        console.error(
          "Error al obtener la información de la asociación: ",
          error
        );
      }
    };
    fetchAssociationInfo();
  }, [associationName]);

  const additionalInfo = isAuthenticated
    ? {
        id: asociacion.id,
        createdAt: asociacion.createdAt,
      }
    : null;

  return (
    <div>
      <AssociationHeader />
      {isAuthenticated && <Actions />}
      <div className="container mx-auto mt-10 bg-slate-500 rounded-lg p-2">
        <h1 className="text-center mt-5">
          Bienvenido: <span className="text-xl">{associationName} </span>
        </h1>
        <AssociationInfo
          info={asociacionInfo}
          isAuthenticated={true}
          additionalInfo={additionalInfo}
        />
      </div>
    </div>
  );
}

export default AssociationPage;
