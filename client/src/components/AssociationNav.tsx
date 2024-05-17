
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu , X} from 'lucide-react';
import { useState } from 'react';


const activeStyleCallback = ({ isActive }) => {
    return isActive ? "text-orange-500" : "text-white";
}

const NavLinks = () => {

    return (
        <>
        <NavLink to="/users/register" className={activeStyleCallback}>Registrar Usuario</NavLink>

        <NavLink to="/users/login" className={activeStyleCallback}>Iniciar Sesión</NavLink>
        <NavLink to="/users/about" className={activeStyleCallback}>Sobre Nosotros</NavLink>
        
        </>

    )
}

const AssociationNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
          <nav className=' flex w-1/3 justify-end'>
            <div className='justify-between hidden md:flex w-full'>

            <NavLinks />

            </div>
            <div className='md:hidden'>
                <button onClick={toggleNavbar} >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
          </nav>
          {isOpen && ( 
                <div className='flex flex-col basis-full items-center'>
                    <NavLinks />
                </div>
          )}
        </>
    )
}
export default AssociationNav;
