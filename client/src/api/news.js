//import { NEWS_API_KEY } from "dotenv";
/**
 *  Fetches news from the API
 * @param { String } associationName
 * @param { Array } keywords
 * @param { Number } maxResults
 * @returns {Promise} Promise with the news data
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
    const defaultKeywords = ["enfermedad", "pacientes"];
    const allkeywords = [
      ...new Set([...defaultKeywords, ...keywords, associationName]),
    ];
    const query = allkeywords.join(" OR ");
    const newskey = import.meta.env.VITE_NEWS_API_KEY;
    console.log(newskey);
    if (!newskey) {
      throw new Error("News API key is required");
    }
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${newskey}&pageSize=${maxResults}&language=es`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await response.json();
    data.keyword = query;
    return data;
  } catch (error) {
    console.error("Error fetching news: ", error);
    throw error;
  }
}
