import { useEffect, useState } from "react";
import { getAllAssociationsRequest } from "../api/association";
import Header from "../components/Header";

function HomePage() {
  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const response = await getAllAssociationsRequest();
        setAssociations(response.data);
        console.log("Asociaciones: ", response.data);
      } catch (error) {
        console.error("Error al obtener las asociaciones: ", error);
      }
    };
    fetchAssociations();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-5 bg-slate-500 rounded-md p-2">
        <h1 className="text-center text-2xl font-bold mb-5">
          Asociaciones de Pacientes
        </h1>
        <h3 className="text-center text-lg text-orange-600 mb-5">
          Haz click para acceder a ella{" "}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {associations.map((association) => (
            <div
              key={association.id}
              className="bg-gray-100 border border-gray-300 p-4 rounded-md"
            >
              <h2 className="text-lg  text-gray-800 font-semibold">
                {association.association}
              </h2>
              <p className="text-sm text-gray-600">
                Email: {association.email}
              </p>
              <p className="text-sm text-gray-600">
                Teléfono: {association.phone}
              </p>
              {association.address && (
                <p className="text-sm text-gray-600">
                  Dirección: {association.address.street},{" "}
                  {association.address.number}. {association.address.city}{" "}
                  {" ("}
                  {association.address.state}
                  {")"} {association.address.postalCode}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;