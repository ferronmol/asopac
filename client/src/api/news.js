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
    const allkeywords = [
      associationName.trim(),
      "enfermedad",
      "pacientes",
      ...keywords,
    ];
    const query = allkeywords.join(" OR ");
    const newskey = "e0a1ccd8efd54f3f91ef2cbb562ab56c";
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
// Path: client/src/api/association.js
