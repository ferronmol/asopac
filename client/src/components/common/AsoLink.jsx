import PropTypes from "prop-types";

/**
 * AsoLink es un componente que muestra un enlace de asociación en forma de tarjeta.
 * @param {*} param0
 * @returns
 */
const AsoLink = ({ text, to, gradientFrom, gradientTo }) => {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full h-full p-6 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-lg shadow-md hover:scale-105 transition-shadow duration-300 flex items-center justify-center text-center`}
    >
      <span className="text-gray-900 font-medium">{text}</span>
    </a>
  );
};

AsoLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default AsoLink;
