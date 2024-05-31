import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Función para obtener la información publica de una asociación por su associationName
 * @param {String} associationName - Nombre de la asociación
 * @returns {Promise} La información de la asociación con message y data
 */
export const getAssociationInfoRequest = async (associationName) => {
  const response = await API.get(`/association/${associationName}`);
  return response.data;
};
/**
 * Función para  todas las asociaciones (para asopacpage)
 * @returns {Promise} La información de la asociación con message y data
 */
export const getAllAssociationsRequest = async () => {
  const response = await API.get("/association");
  return response.data;
};

/**
 * Funcion para obtener TODA la informacion de una asociacion por su id
 * @param {String} associationId - Id de la asociación
 * @returns {Promise} La información de la asociación con message y data
 */
export const getAssociationByIdRequest = async (associationId) => {
  const response = await API.get(`/association/id/${associationId}`);
  return response.data;
};

/**
 * Función para obtener la información de una asociación por su associationName
 * @param {String} associationName - Nombre de la asociación
 * @returns  La información de la asociación con message y data
 */

export const getAssociationByNameRequest = async (associationName) => {
  try {
    const encodedAssociationName = encodeURIComponent(associationName);
    const response = await API.get(`/association/${encodedAssociationName}`);
    console.log("Respuesta de la API de asociación: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error en getAssociationByNameRequest:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

/**
 * Funcion para borrar una asociacion por su id
 * @param {String} associationId - Id de la asociación
 * @returns {Promise} La información de la asociación
 */

export const deleteAssociationRequest = async (associationId) => {
  try {
    const response = await API.delete(`/association/${associationId}`);
    return response.data;
  } catch (error) {
    console.error("Error al borrar la asociación: ", error);
    throw error;
  }
};

/**
 * Funcion para añadir informacion a una asociacion a traves de un formulario
 * @param {Object} data - Información de la asociación
 * @param {String} associationName - Nombre de la asociación
 * @returns {Promise} La información de la asociación
 */

export const addAssociationInfoRequest = async (data, associationName) => {
  try {
    const response = await API.post(
      `/association/${encodeURIComponent(associationName)}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error al añadir información a la asociación: ", error);
    throw error;
  }
};
