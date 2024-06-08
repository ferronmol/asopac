import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <ul className="list-none mt-5 ">
        <li className="mb-6">
          <NavLink
            to="info"
            className={({ isActive }) =>
              isActive ? "font-bold text-orange-500" : ""
            }
          >
            Información de la Asociación
          </NavLink>
        </li>
        <li className="mb-6">
          <NavLink
            to="external-data"
            className={({ isActive }) =>
              isActive ? "font-bold text-orange-500" : ""
            }
          >
            Noticias
          </NavLink>
        </li>
        <li className="mb-6">
          <NavLink
            to="members"
            className={({ isActive }) =>
              isActive ? "font-bold text-orange-500" : ""
            }
          >
            Miembros
          </NavLink>
        </li>
        <li className="mb-6">
          <NavLink
            to="others"
            className={({ isActive }) =>
              isActive ? "font-bold text-orange-500" : ""
            }
          >
            Otras asociaciones
          </NavLink>
        </li>
        <li className="mb-6">
          <NavLink
            to="links"
            className={({ isActive }) =>
              isActive ? "font-bold text-orange-500" : ""
            }
          >
            Enlaces de interés
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
