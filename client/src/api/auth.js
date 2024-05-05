import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerRequest = async (asociacion) => {
  const response = await API.post("/register", asociacion);
  return response;
};

export const loginRequest = async (asociacion) => {
  const response = await API.post("/login", asociacion);
  return response;
};
