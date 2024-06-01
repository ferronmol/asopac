const AssociationInfo = ({ info, isAuthenticated, additionalInfo }) => {
  console.log(info); // info publica quitar id
  console.log("additional", additionalInfo); //createAt e id
  if (!info) return null;

  const keywordsFormatted = info.keywords.join(", ");
  return (
    <div className="bg-gray-500 p-5 rounded-md mt-0">
      <h3 className="ml-5 text-lg bg-orange-600 p-2 rounded-md">
        Información de la Asociación:
      </h3>
      <div className="font-semibold text-lg text-gray-200">
        <ul className="list-disc ml-10 mt-2">
          <li>Nombre: {info.associationName}</li>
          <li>Mail: {info.email}</li>

          <li>Teléfono: {info.phone}</li>
          <li>Descripción: {info.description}</li>
          {info.address && (
            <li>
              Dirección: {info.address.street}, {info.address.number}.{" "}
              {info.address.city} {" ("}
              {info.address.state}
              {")"} {info.address.postalCode}
            </li>
          )}
          <li>Página web: www.asopac/association/{info.associationName} </li>
        </ul>
      </div>
      {isAuthenticated && additionalInfo && (
        <>
          <div className="font-semibold text-lg text-gray-200">
            <ul className="list-disc ml-10 mt-2">
              <li>ID: {additionalInfo.id}</li>
              <li>Palabras clave: {keywordsFormatted}</li>
              <li>Asociacion creada: {additionalInfo.createdAt}</li>
              <li>Asociación modificada: {additionalInfo.updatedAt}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AssociationInfo;
