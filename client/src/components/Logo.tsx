import React from "react";




const Logo = () => {
  return (
    <div className="flex items-center  p-2  bg-orange">
      <img
         src="../../public/images/manos.avif"
        alt="Logo"
        className="logo w-16 h-16 sm:w-24 sm:h-24 rounded-full"
        style = {{borderRadius: "50%"}}
      />
    </div>
  );
};

export default Logo;