import { createContext, useState, useContext, useEffect } from "react";
import { registerUserRequest, loginRequest } from "../api/user";
import { getAssociationByNameRequest } from "../api/association";
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
  //Obtengo el id de la asociacion de la que se quiere registrar el usuario por su nombre
  const getAssociationByName = async (associationName) => {
    try {
      const response = await getAssociationByNameRequest(associationName);
      console.log("Respuesta de la asociacion por nombre: ", response);
      return response.data.associateId;
    } catch (error) {
      console.error("Error al obtener la asociacion por nombre:", error);
      return null;
    }
  };

  /**
   * Funcion para registrar un usuario, LE AÑADIMOS el id de la asociacion a la que pertenece en su array de asociaciones
   * @param {Object} userData Datos del usuario a registrar
   * @param {String} associationName Nombre de la asociación a la que pertenece el usuario
   * @returns  {Promise} Respuesta de la petición de registro
   */

  const signupUser = async (userData, associationName) => {
    try {
      const associationId = await getAssociationByName(associationName);
      console.log("Id de la asociacion obtenido: ", associationId);
      if (associationId) {
        if (associationId) {
          userData.association = userData.association || [];
          userData.association.push(associationId);
        }
      }
      const response = await registerUserRequest(userData);
      // console.log("Respuesta de usuario registrado: ", response.data);
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
    removeAuthToken();
  };
  const removeAuthToken = () => {
    Cookies.remove("user-token");
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
