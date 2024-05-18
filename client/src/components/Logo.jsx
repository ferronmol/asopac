import manos from "../assets/images/manos.avif";

const Logo = () => {
  return (
    <div className="flex items-center  p-2 bg-orange">
      <img
        src={manos}
        alt="Logo"
        className="logo w-12 h-12 sm:w-18 sm:h- rounded-full "
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
};

export default Logo;
