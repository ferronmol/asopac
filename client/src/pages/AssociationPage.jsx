import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { getAssociationInfoRequest } from "../api/association";
import { useEffect, useState } from "react";
import formatDate from "../assets/formatDate";

function AssociationPage() {
  const { associationName } = useParams(); // Obtener el nombre de la asociación de los parámetros de la ruta
  const [asociacionInfo, setAsociacionInfo] = useState(null); // Estado para guardar la información de la asociación
  const { asociacion, isAuthenticated } = useAuth(); // Obtener la asociación del contexto de autenticación

  useEffect(() => {
    // Función para obtener la información de la asociación
    const fetchAssociationInfo = async () => {
      try {
        const response = await getAssociationInfoRequest(associationName);
        setAsociacionInfo(response.data);
        //console.log("Información de la asociación: ", response.data);
        console.log(asociacion);
      } catch (error) {
        console.error(
          "Error al obtener la información de la asociación: ",
          error
        );
      }
    };
    fetchAssociationInfo();
  }, [associationName]);

  // No necesita autenticacion para visualziar la información publica de la asociación pero si la privada

  if (!isAuthenticated) {
    console.log("Está en perfil publico", asociacionInfo);
    return (
      <div>
        <h1 className="text-center mt-5">
          Bienvenido a la página de acceso público de {associationName}
        </h1>
        <div className="bg-gray-500 p-5 rounded-md">
          <h3>Información Pública de la Asociación:</h3>
          {asociacionInfo && (
            <>
              <p className="text-sm text-orange-600">
                Nombre: {asociacionInfo.associationName}
              </p>{" "}
              <p className="text-sm text-orange-600">
                Mail: {asociacionInfo.email}
              </p>
              <p className="text-sm text-orange-600">
                Teléfono: {asociacionInfo.phone}
              </p>
              {asociacionInfo.address && (
                <p className="text-sm text-orange-600">
                  Dirección: {asociacionInfo.address.street},{" "}
                  {asociacionInfo.address.number}. {asociacionInfo.address.city}{" "}
                  {" ("}
                  {asociacionInfo.address.state}
                  {")"} {asociacionInfo.address.postalCode}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
  // Si esta autenticado muestra la información privada de la asociación
  console.log("Está en perfil privado", asociacionInfo);
  console.log(asociacion);
  const formattedDate = formatDate(asociacion.createdAt);
  return (
    <div>
      <h1 className="text-center mt-5">
        Bienvenido a su zona{" "}
        <span className="text-red-700 p-2 bg-orange-400 rounded-sm">
          PRIVADA
        </span>{" "}
        de {associationName}
      </h1>
      <div>
        {asociacionInfo && (
          <>
            <h2>Información de la Asociación:</h2>
            <p>ID: {asociacion.id}</p>
            <p>Nombre: {asociacionInfo.associationName}</p>
            <p>Email: {asociacionInfo.email}</p>
            <p>Telefono: {asociacionInfo.phone}</p>
            {asociacionInfo.address && (
              <p className="text-sm text-orange-600">
                Dirección: {asociacionInfo.address.street},{" "}
                {asociacionInfo.address.number}. {asociacionInfo.address.city}{" "}
                {" ("}
                {asociacionInfo.address.state}
                {")"} {asociacionInfo.address.postalCode}
              </p>
            )}
            <p>
              Asociacion creada:{" "}
              {asociacion.createdAt ? formattedDate : "Fecha no disponible"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AssociationPage;
