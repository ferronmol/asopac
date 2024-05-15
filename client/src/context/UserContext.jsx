/*import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/user";
import PropTypes from "prop-types";
import { useEffect } from "react";

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
  const [errors, setErrors] = useState(null);

  const registerUser = async (userData) => {
    try {
      const response = await registerRequest(userData);
      setUser(response.data.data);
      setErrors(null);
      return response;
    } catch (error) {
      console.error("Error al registrar el usuario:", error.response.data);
      setErrors(error.response.data.message);
      return null;
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
    <UserContext.Provider
      value={{
        user,
        asociacion: user,
        errors,
        registerUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
*/
