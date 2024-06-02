/**
 * Este componente para barra de navegación de ASOCIACIONES
 * @module Nav
 */
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const activeStyleCallback = ({ isActive }) => {
  return isActive ? "text-orange-500" : "text-white";
};

const NavLinks = ({ associationName, isAuthenticated }) => {
  console.log(
    "associationName y isAuthenticated en NavLinks:",
    associationName,
    isAuthenticated
  );
  return (
    <>
      <NavLink to="/" className={activeStyleCallback}>
        Inicio
      </NavLink>
      <NavLink to="/association/register" className={activeStyleCallback}>
        Crear Asociación
      </NavLink>
      <NavLink to="/association/login" className={activeStyleCallback}>
        {" "}
        Entrar en Asociación
      </NavLink>
      <NavLink to="/association/about" className={activeStyleCallback}>
        Sobre Asopac
      </NavLink>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className=" flex w-full md:w-1/3 justify-end">
        <div className="justify-between hidden md:flex w-full items-center h-full">
          <div className="flex space-x-4 items-center">
            <NavLinks isAuthenticated={isAuthenticated} />
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleNavbar}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col basis-full items-center w-full">
          <NavLinks />
        </div>
      )}
    </>
  );
};
export default Nav;
