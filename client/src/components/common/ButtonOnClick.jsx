import PropTypes from "prop-types";

const ButtonOnClick = ({ text, onClick }) => {
  const handleClick = () => {
    console.log("Botón pulsado");
    onClick();
  };
  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-2 px-4 rounded hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300"
    >
      {text}
    </button>
  );
};

ButtonOnClick.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonOnClick;
