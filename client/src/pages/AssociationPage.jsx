import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { getAssociationInfoRequest } from "../api/association";
import { useEffect, useState } from "react";

function AssociationPage() {
  const { associationName } = useParams(); // Obtener el nombre de la asociación de los parámetros de la ruta
  const [asociacionInfo, setAsociacionInfo] = useState(null); // Estado para guardar la información de la asociación
  const { asociacion, isAuthenticated } = useAuth(); // Obtener la asociación del contexto de autenticación

  useEffect(() => {
    // Función para obtener la información de la asociación
    const fetchAssociationInfo = async () => {
      try {
        const response = await getAssociationInfoRequest(associationName);
        console.log("Información de la asociación: ", response);
        setAsociacionInfo(response.data);
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
    console.log("perfil publico", asociacionInfo);
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
  console.log("perfil privado", asociacion);
  return (
    <div>
      <h1 className="text-center mt-5">
        Bienvenido a su zona privada{" "}
        <span className="text-red-700 p-2 bg-orange-400 ">PRIVADA</span> de{" "}
        {associationName}
      </h1>
      <div>
        <h3>Información de la Asociación:</h3>
        <p>ID: {asociacion.id}</p>
        <p>Nombre: {asociacion.associationName}</p>
        <p>Email: {asociacion.email}</p>
        <p>Telefono: {asociacion.phone}</p>
        {asociacionInfo.address && (
          <p className="text-sm text-orange-600">
            Dirección: {asociacionInfo.address.street},{" "}
            {asociacionInfo.address.number}. {asociacionInfo.address.city}{" "}
            {" ("}
            {asociacionInfo.address.state}
            {")"} {asociacionInfo.address.postalCode}
          </p>
        )}
        <p>Asociacion creada: {asociacion.createdAt}</p>
      </div>
    </div>
  );
}

export default AssociationPage;
