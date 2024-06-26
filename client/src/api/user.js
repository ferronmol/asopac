import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 * Función para hacer una petición al backend para registrar un usuario
 * @param  {Object} user - Datos del usuario a registrar
 * @returns  Respuesta del backend
 */
export const registerUserRequest = async (user) => {
  const response = await API.post("/users/register", user);
  return response;
};
/**
 *  Función para hacer una petición al backend para iniciar sesión
 * @param {Object} user - Datos de la asociación para iniciar sesión
 * @returns
 */
export const loginRequest = async (user) => {
  const response = await API.post("/users/login", user);
  return response;
};
/**
 * Función para hacer una petición al backend para cerrar sesión
 * @returns
 */
export const logoutUserRequest = async () => {
  const response = await API.post("/user/logout");
  return response;
};
/**
 * Función para hacer una petición al backend para verificar el token de autenticación
 * @returns
 */

export const verifyTokenRequest = async () => {
  const response = await API.get("/verify");
  return response;
};

/**
 * Funcion que hace una petición al backend para obtener la información de un usuario pasando su nombre de usuario
 * @param {} username
 * @returns
 */
export const getUserInfoRequest = async (username) => {
  const response = await API.get(`/users/${username}`);
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
