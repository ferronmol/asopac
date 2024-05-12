
import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <>
         <NavLink to="association/register" activeClassName="active">Crear una Asociación</NavLink>
        <NavLink to="association/login" activeClassName="active">Entra en tu Asociación</NavLink>     
        <NavLink to="/about" activeClassName="active">Sobre Asopac</NavLink>
        </>
    )
}

export default Nav;
