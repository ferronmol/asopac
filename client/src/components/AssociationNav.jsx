/*
 * Este componente para barra de navegación parra USUARIOS
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
      <NavLink
        to={(associationName, `/association/${associationName}/users/register`)}
        className={activeStyleCallback({ isActive: false })}
      >
        Registrar Usuario
      </NavLink>
      <NavLink
        to={(associationName, `/association/${associationName}/users/login`)}
        className={activeStyleCallback({ isActive: false })}
      >
        Iniciar Usuario
      </NavLink>
      <NavLink
        to={`/association/${associationName}/info`}
        className={activeStyleCallback({ isActive: true })}
      >
        Sobre Nosotros
      </NavLink>
      {!isAuthenticated && (
        <NavLink
          to="/association/login"
          className={activeStyleCallback({ isActive: false })}
        >
          Zona Privada
        </NavLink>
      )}
    </>
  );
};

const AssociationNav = ({ associationName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className=" flex w-1/3 justify-end">
        <div className="justify-between hidden md:flex w-full">
          {/* Aquí se llama a NavLinks y le pasamos las props */}
          <NavLinks
            associationName={associationName}
            isAuthenticated={isAuthenticated}
          />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col basis-full items-center">
          <NavLinks
            associationName={associationName}
            isAuthenticated={isAuthenticated}
          />
        </div>
      )}
    </>
  );
};
export default AssociationNav;
