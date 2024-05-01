import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerRequest = async (asociacion) => {
  try {
    const response = await API.post("/register", asociacion);
    return response;
  } catch (error) {
    throw error; // Re-lanzamos el error para manejarlo en el contexto
  }
};
