import { useEffect, useState } from "react";
import { getNewsByAssociation } from "../api/news";
import { useParams } from "react-router-dom";

const ExternalDataPage = () => {
  const { associationName } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const maxResults = 20;
        const keywords = ["enfermedad", "pacientes"];
        const data = await getNewsByAssociation(
          associationName,
          keywords,
          maxResults
        );
        console.log("Data: ", data.articles, "Keyword: ", data.keyword);
        setNews(data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };
    fetchNews();
  }, [associationName]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 text-center">
        Noticias en {associationName}{" "}
      </h1>
      {loading ? (
        <p>Loading...</p>
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
