import manos from "../assets/images/manos.avif";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center  p-2 bg-orange">
      <Link to="/">
        <h1 className="text-white  font-serif font-bold">Asopac</h1>
        <img
          src={manos}
          alt="Logo"
          className="logo w-12 h-12 sm:w-18 sm:h- rounded-full "
          style={{ borderRadius: "50%" }}
        />
      </Link>
    </div>
  );
};

export default Logo;
