import { useEffect, useState } from "react";
import { getNewsByAssociation } from "../api/news";
import { useParams } from "react-router-dom";
import { getAssociationByNameRequest } from "../api/association";

/**
 * Renderiza una página con noticias relacionadas con una asociación.
 * @returns {JSX.Element}
 */
const ExternalDataPage = () => {
  const { associationName } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setNoResults(false);

        // Obtener la información de la asociación
        const associationResponse = await getAssociationByNameRequest(
          associationName
        );
        const fetchedAssociationData = associationResponse.data;
        console.log("Data: ", fetchedAssociationData);

        // Extraer las keywords de la asociación si las tiene
        const associationKeywords = fetchedAssociationData.keywords || [];
        console.log(
          "Las palabras clave de la asociación son: ",
          associationKeywords
        );
        //Tenemos palabras por defecto en caso de que no haya palabras clave
        const defaultKeywords = ["enfermedad", "salud", "pacientes"];

        // Obtener las noticias de la asociación
        const maxResults = 20;
        const newsResponse = await getNewsByAssociation(
          associationName,
          associationKeywords.length > 0
            ? associationKeywords
            : defaultKeywords,
          maxResults
        );
        const fetchedNews = newsResponse.articles;
        console.log(
          "Data: ",
          fetchedNews,
          "KeywordQuery: ",
          newsResponse.keywordQuery
        );

        if (fetchedNews.length === 0) {
          setNoResults(true);
        }
        setNews(fetchedNews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData(); // Llamar a fetchData una vez al montar el componente o cuando associationName cambie
  }, [associationName]); // Ejecutar useEffect solo cuando associationName cambie

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 text-center">
        Noticias en {associationName}
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : noResults ? (
        <p>No se encontraron noticias para {associationName}</p>
      ) : (
        <div>
          {news.map((article, index) => (
            <div key={index} className="mb-5">
              <h2 className="text-xl font-bold">{article.title}</h2>
              <p>{article.description}</p>
              <p>{article.publishedAt}</p>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-60 h-auto object-cover object-center m-1"
                />
              )}
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Leer más
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExternalDataPage;
