import { createContext, useState, useContext, useEffect } from "react";
import { registerUserRequest, loginRequest } from "../api/user";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

export const UserContext = createContext();

//eslint-disable-next-line
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe estar dentro del proveedor UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);

  const setAuthToken = (token) => {
    Cookies.set("user-token", token, {
      expires: 1,
      sameSite: "none",
      secure: true,
    });
  };

  /**
   * Funcion para registrar un usuario
   * @param {Object} userData Datos del usuario a registrar
   * @returns  {Promise} Respuesta de la petición de registro
   */

  const signupUser = async (userData) => {
    try {
      const response = await registerUserRequest(userData);
      console.log("Respuesta de usuario registrado: ", response.data);
      setUser(response.data.data);
      setIsAuthenticated(true);
      setErrors(null);
      setAuthToken(response.data.token);

      return response;
    } catch (error) {
      console.error("Error al registrar el usuario:", error.response.data);
      setErrors(error.response.data.message);
      return null;
    }
  };

  /**
   * Función para iniciar sesión de usuario
   */
  const signinUser = async (userData) => {
    try {
      const response = await loginRequest(userData);
      console.log("Respuesta de login de usuario: ", response.data);
      setUser(response.data.data);
      setIsAuthenticated(true);
      console.log("Usuario autenticado: ", isAuthenticated());
      setErrors(null);

      setAuthToken(response.data.token);

      return response;
    } catch (error) {
      console.error(
        "Error al iniciar sesión del usuario:",
        error.response.data
      );
      setErrors(error.response.data.message);
      return null;
    }
  };

  /**
   * Función para cerrar sesión de usuario
   */
  const signoutUser = () => {
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("user-token");
  };
  const removeAuthToken = () => {
    Cookies.remove("user-token");
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

  return (
    <UserContext.Provider
      value={{
        signupUser,
        signinUser,
        signoutUser,
        user,
        isAuthenticated,
        errors,
        setAuthToken,
        removeAuthToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
