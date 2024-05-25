import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <ul className="list-none mt-5 ">
        <li className="mb-6">
          <NavLink to="info" activeClassName="font-bold">
            Información de la Asociación
          </NavLink>
        </li>
        <li className="mb-6">
          <NavLink to="external-data" activeClassName="font-bold">
            Noticias
          </NavLink>
        </li>
        <li className="mb-6">
          <NavLink to="members" activeClassName="font-bold">
            Miembros
          </NavLink>
        </li>
        <li className="mb-6">
          <NavLink to="others" activeClassName="font-bold">
            Otras asociaciones
          </NavLink>
        </li>
        <li className="mb-6">
          <NavLink to="links" activeClassName="font-bold">
            Enlaces de interes
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
