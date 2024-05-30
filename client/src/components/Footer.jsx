import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import manos from "../assets/images/manos.avif";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 md:flex items-center">
          <img
            src={manos}
            alt="Logo"
            className="w-20 h-20 sm:w-32 sm:h-32 rounded-full transform transition-transform duration-300 hover:scale-110 mr-4"
          />
          <h1 className="text-white text-2xl font-serif font-bold">Asopac</h1>
        </div>
        <div className="flex justify-center md:justify-end space-x-6">
          <a
            href="https://www.facebook.com"
            aria-label="Facebook"
            className="text-2xl text-white hover:text-gray-400"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com"
            aria-label="Linkedin"
            className="text-2xl text-white hover:text-gray-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/ferronmol/asopac"
            aria-label="Github"
            className="text-2xl text-white hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com"
            aria-label="Instagram"
            className="text-2xl text-white hover:text-gray-400"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className="container mx-auto mt-6 text-sm">
        <p className="mb-2">© Copyright 2024</p>
        <div className="flex justify-center md:justify-end space-x-4">
          <a href="/aviso-legal" className="hover:underline">
            Aviso Legal
          </a>
          <span>|</span>
          <a href="/politica-privacidad" className="hover:underline">
            Política de privacidad
          </a>
          <span>|</span>
          <a href="/politica-cookies" className="hover:underline">
            Política de cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
