import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */

/**
 * Botón que redirige a una ruta o funciona como botón de envío
 * @param {*} param0
 * @returns
 */
function ButtonLink({ text, to, type = "button" }) {
  if (type === "link") {
    return (
      <Link to={to}>
        <button
          type="button"
          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2"
        >
          {text}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2"
    >
      {text}
    </button>
  );
}

export default ButtonLink;
