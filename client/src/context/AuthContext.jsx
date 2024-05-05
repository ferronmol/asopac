import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

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

  const signup = async (asociacionData) => {
    try {
      const response = await registerRequest(asociacionData);
      console.log("Respuesta de asociacion registrada: ", response.data);
      setAsociacion(response.data.data); // Guarda la asociación en el estado
      setIsAuthenticated(true); // Cambia el estado de autenticación a true
      console.log("la autenticacion es: ", isAuthenticated);
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
      console.log("la autenticacion es: ", isAuthenticated);
      setErrors(null); // Resetea el estado de errores
      return response;
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        return setErrors(error.response.data.message);
      }

      setErrors([error.response.data.message]);
    }
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
    <AuthContext.Provider
      value={{
        signup,
        signin,
        asociacion,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
