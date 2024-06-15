import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../api/auth";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

export const AuthContext = createContext();

//eslint-disable-next-line
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [asociacion, setAsociacion] = useState(null);
  const [associationName, setAssociationName] = useState(null); //eslint-disable-line
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para registrar una asociación
  const signup = async (asociacionData) => {
    try {
      const response = await registerRequest(asociacionData);
      console.log("Respuesta de asociacion registrada: ", response.data);
      // Guarda la cookie de autenticación
      Cookies.set("token", response.data.token, {
        expires: 1,
        sameSite: "none",
        secure: true,
      });
      console.log("Cookie de autenticación guardada: ", Cookies.get("token"));

      setAsociacion(response.data.data); // Guarda la asociación en el estado
      setAssociationName(response.data.data.associationName); // Guarda el nombre de la asociación en el estado
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

  const signout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
    setIsAuthenticated(false);
    setAsociacion(null);
    Cookies.remove("token");
    Cookies.remove("tokenUser");
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
    async function checkLogin() {
      const token = Cookies.get("token");
      console.log("Cookies: ", Cookies.get());

      if (!token) {
        setIsAuthenticated(false);
        setAsociacion(null);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);
        console.log("Respuesta de verificación de token: ", res.data.data);

        if (!res.data.data) {
          setIsAuthenticated(false);
          setAsociacion(null);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setAsociacion(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al verificar el token", error);
        setIsAuthenticated(false);
        setAsociacion(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    //utilizo el componente AuthContext.Provider para pasar las funciones y estados a los componentes hijos
    <AuthContext.Provider
      value={{
        signup,
        signin,
        loading,
        asociacion,
        isAuthenticated,
        associationName,
        errors,
        signout,
      }}
    >
      {children} {/* Renderizamos los componentes hijos*/}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
