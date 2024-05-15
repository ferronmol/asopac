import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../api/user";
import PropTypes from "prop-types";

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

  const loginUser = async (userData) => {
    try {
      const response = await loginRequest(userData);
      setUser(response.data.data);
      setErrors(null);
      return response;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response.data);
      setErrors(error.response.data.message);
      return null;
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        errors,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
