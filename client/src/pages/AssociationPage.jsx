import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { getAssociationInfoRequest } from "../api/association";
import { useEffect, useState } from "react";
import formatDate from "../assets/formatDate";
import AssociationHeader from "../components/AssociationHeader";

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

  // Si no esta autenticado muestra la información publica de la asociación

  if (!isAuthenticated) {
    console.log("Está en perfil publico", asociacionInfo);
    return (
      <div>
        <AssociationHeader associationName={associationName} />
        <div className="container mx-auto mt-20 bg-slate-500 rounded-lg p-2">
          <h1 className="text-center mt-5">
            Bienvenido a {""}
            <span className="text-red-700 p-2 bg-orange-400 rounded-sm">
              {associationName}
            </span>
          </h1>
          <div className="bg-gray-500 p-5 rounded-md">
            {asociacionInfo && (
              <>
                <h3 className="ml-5 text-lg bg-orange-600 p-2 rounded-md mt-2">
                  Información de la Asociación:
                </h3>
                <div className="font-semibold text-lg text-gray-200">
                  <ul className="list-disc ml-10 mt-2">
                    <li>Nombre: {asociacionInfo.associationName}</li>{" "}
                    <li>Mail: {asociacionInfo.email}</li>
                    <li>Teléfono: {asociacionInfo.phone}</li>
                    {asociacionInfo.address && (
                      <li>
                        Dirección: {asociacionInfo.address.street},{" "}
                        {asociacionInfo.address.number}.{" "}
                        {asociacionInfo.address.city} {" ("}
                        {asociacionInfo.address.state}
                        {")"} {asociacionInfo.address.postalCode}
                      </li>
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
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
      <AssociationHeader />{" "}
      <div className="container mx-auto mt-20 bg-slate-500 rounded-lg p-2">
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
              <h2 className="ml-5 text-lg bg-orange-600 p-2 rounded-md mt-2">
                Información de la Asociación:
              </h2>
              <div className="font-semibold text-lg text-gray-200">
                <ul className="list-disc ml-10 mt-2">
                  <li>ID: {asociacion.id}</li>
                  <li>Nombre: {asociacionInfo.associationName}</li>
                  <li>Email: {asociacionInfo.email}</li>
                  <li>Telefono: {asociacionInfo.phone}</li>
                  {asociacionInfo.address && (
                    <li>
                      Dirección: {asociacionInfo.address.street},{" "}
                      {asociacionInfo.address.number}.{" "}
                      {asociacionInfo.address.city} {" ("}
                      {asociacionInfo.address.state}
                      {")"} {asociacionInfo.address.postalCode}
                    </li>
                  )}
                  <li>
                    Asociacion creada:{" "}
                    {asociacion.createdAt
                      ? formattedDate
                      : "Fecha no disponible"}
                  </li>
                </ul>
              </div>
              <div className="container  mx-auto mt-5 bg-gray-500 p-5 rounded-md  font-semibold text-lg text-gray-200">
                <h2 className="text-lg bg-orange-600 p-2 rounded-md mt-2">
                  Información de los miembros:
                </h2>
                <ul className="list-disc ml-5 mt-2">
                  <li>Miembros: {"No disponible"}</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssociationPage;
