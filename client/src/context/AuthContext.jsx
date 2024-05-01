import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth";

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
      setErrors(null); // Resetea el estado de errores
      return response;
    } catch (error) {
      console.error("Error al registrar la asociación:", error.response.data);
      setErrors(error.response.data.message); // Guarda el mensaje de error en el estado

      return null; // Devolvemos null en caso de error
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        asociacion,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
