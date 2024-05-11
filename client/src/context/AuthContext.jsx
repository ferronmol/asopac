import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import { set } from "mongoose";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [asociacion, setAsociacion] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);

  // Función para registrar una asociación
  const signup = async (asociacionData) => {
    try {
      const response = await registerRequest(asociacionData);
      console.log("Respuesta de asociacion registrada: ", response.data);
      setAsociacion(response.data.data); // Guarda la asociación en el estado
      setIsAuthenticated(true); // Cambia el estado de autenticación a true
      setErrors(null); // Resetea el estado de errores
      return response;
    } catch (error) {
      console.error("Error al registrar la asociación:", error.response.data);
      setErrors(error.response.data.message); // Guarda el mensaje de error en el estado

      return null; // Devolvemos null en caso de error
    }
  };

  const signin = async (asociacionData) => {
    try {
      const response = await loginRequest(asociacionData);
      console.log("Respuesta del login de asociacion: ", response.data);
      setAsociacion(response.data.data); // Guarda la asociación en el estado
      setIsAuthenticated(true); // Cambia el estado de autenticación a true
      setErrors(null); // Resetea el estado de errores;
      // Guarda la cookie de autenticación
      Cookies.set("token", response.data.token, {
        expires: 1,
        sameSite: "none",
        secure: true,
      });
      console.log("Cookie de autenticación guardada: ", Cookies.get("token"));

      return response;
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        return setErrors(error.response.data.message);
      }

      setErrors([error.response.data.message]);
    }
  };

  const signout = () => {
    setIsAuthenticated(false);
    setAsociacion(null);
    Cookies.remove("token");
  };

  // useEffect para borra los errores después de 5 segundos
  useEffect(() => {
    if (errors && errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors(null);
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [errors]);

  //useEffect para verificar si el token es válido
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = Cookies.get("token");
        console.log("Token: ", token);
        if (!token) {
          setIsAuthenticated(false);
          setAsociacion(null);
          return;
        }

        const res = await verifyTokenRequest(token);
        console.log("Respuesta de verificar token: ", res.data.message);
        if (!res.data.data) {
          setIsAuthenticated(false);
          setAsociacion(null);
          Cookies.remove("token");
        } else {
          setIsAuthenticated(true);
          setAsociacion(res.data.data);
        }
      } catch (error) {
        console.error("Error al verificar el token", error);
        setIsAuthenticated(false);
        setAsociacion(null);
        Cookies.remove("token");
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        asociacion,
        isAuthenticated,
        errors,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
