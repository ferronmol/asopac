import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Función para hacer una petición al backend para obtener la información publica de una asociación
 * @param {String} associationName - Nombre de la asociación
 * @returns
 */
export const getAssociationInfoRequest = async (associationName) => {
  const response = await API.get(`/association/${associationName}`);
  return response.data;
};
/**
 * Función para hacer una petición al backend  de todas las asociaciones (para asopacpage)
 * @returns
 */
export const getAllAssociationsRequest = async () => {
  const response = await API.get("/association");
  return response.data;
};
