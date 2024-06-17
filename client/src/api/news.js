/**
 * Funcion para obtener noticias de una asociación en base a palabras clave
 * @param {*} associationName
 * @param {*} keywords
 * @param {*} maxResults
 * @returns
 */

export async function getNewsByAssociation(
  associationName,
  keywords = [],
  maxResults
) {
  try {
    if (!associationName) {
      throw new Error("Association name is required");
    }
    if (!maxResults) {
      throw new Error("Max results is required");
    }
    if (!Array.isArray(keywords)) {
      throw new Error("Keywords must be an array");
    }

    const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;
    if (!newsApiKey) {
      throw new Error("News API key is required");
    }

    // Usar solo las keywords proporcionadas por el usuario
    const uniqueKeywords = [...new Set(keywords)];
    const keywordQuery = uniqueKeywords.join(" OR ");
    const associationQuery = associationName;

    const fetchNews = async (query) => {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}&pageSize=${maxResults}&language=es`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      return response.json();
    };

    // Buscar noticias con las palabras clave proporcionadas por el usuario
    const keywordNewsData = await fetchNews(keywordQuery);

    // Buscar noticias con el nombre de la asociación
    const associationNewsData = await fetchNews(associationQuery);

    // Combinar los resultados, asegurando que no haya duplicados
    const combinedNews = [
      ...new Set([
        ...keywordNewsData.articles,
        ...associationNewsData.articles,
      ]),
    ];

    // Limitar el número de resultados combinados
    const limitedCombinedNews = combinedNews.slice(0, maxResults);

    return {
      articles: limitedCombinedNews,
      keywordQuery,
      associationName,
    };
  } catch (error) {
    console.error("Error fetching news: ", error);
    throw error;
  }
}
