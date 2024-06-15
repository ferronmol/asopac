import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 * Función para hacer una petición al backend para registrar una asociación
 * @param  {Object} asociacion - Datos de la asociación a registrar
 * @returns  Respuesta del backend
 */
export const registerRequest = async (asociacion) => {
  const response = await API.post("/register", asociacion);
  return response;
};
/**
 *  Función para hacer una petición al backend para iniciar sesión
 * @param {Object} asociacion - Datos de la asociación para iniciar sesión
 * @returns
 */
export const loginRequest = async (asociacion) => {
  const response = await API.post("/login", asociacion);
  return response;
};
/**
 * Función para hacer una petición al backend para cerrar sesión
 * @returns
 */
export const logoutRequest = async () => {
  const response = await API.post("/logout");
  return response;
};
/**
 * Función para hacer una petición al backend para verificar el token de autenticación
 * @returns
 */

export const verifyTokenRequest = async (token) => {
  const response = await API.get("/verify", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
