import { useEffect, useState } from "react";
import { getAllAssociationsRequest } from "../api/association";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function HomePage() {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const response = await getAllAssociationsRequest();
        setAssociations(response.data);
        setLoading(false);
        console.log("Asociaciones: ", response.data);
      } catch (error) {
        setError("Error al obtener las asociaciones");
        setLoading(false);
        console.error("Error al obtener las asociaciones: ", error);
      }
    };
    fetchAssociations();
  }, []);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20 bg-slate-500 rounded-md p-2">
        <h1 className="text-center text-2xl font-bold mb-5">
          Asociaciones de Pacientes
        </h1>
        <h3 className="text-center text-lg text-orange-600 mb-5">
          Haz click para acceder a ella{" "}
        </h3>
        {error && (
          <div className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error} Por favor, inténtalo mas tarde.
          </div>
        )}
        {/*responsive grid */}
        <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-flow-row gap-4">
          {associations.map((association) => (
            <Link
              key={association.id}
              to={`/association/${association.association}`}
              className="bg-gray-100 border border-gray-300 p-4 rounded-md"
            >
              <div className="bg-gray-100 border border-gray-300 p-4 rounded-md">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
