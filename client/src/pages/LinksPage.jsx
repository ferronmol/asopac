import AsoLink from "../components/common/AsoLink";

const links = () => {
  return (
    <>
      <h1 className=" text-center  mt-2 font-serif text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to bg-white ">
        Enlaces de Interés
      </h1>
      <div className="bg-gray-200 p-6 mt-2  rounded-md">
        <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-flow-row gap-4">
          <AsoLink
            text="Ministerio de Sanidad"
            to="https://www.mscbs.gob.es"
            gradientFrom="from-pink-500"
            gradientTo="to-red-500"
          />
          <AsoLink
            text="Organización Mundial de la Salud"
            to="https://www.who.int/es"
            gradientFrom="from-purple-500"
            gradientTo="to-indigo-500"
          />
          <AsoLink
            text="Geicam Investigación en Cáncer de Mama"
            to="https://www.geicam.org"
            gradientFrom="from-green-500"
            gradientTo="to-teal-500"
          />
          <AsoLink
            text="Plataforma de Organizaciones de Pacientes"
            to="https://www.plataformadepacientes.org"
            gradientFrom="from-green-500"
            gradientTo="to-teal-500"
          />
          <AsoLink
            text="Sociedad Española de Oncología Médica"
            to="https://seom.org"
            gradientFrom="from-yellow-500"
            gradientTo="to-orange-500"
          />
          <AsoLink
            text="Sociedad Española de Inmunología"
            to="https://www.inmunologia.org"
            gradientFrom="from-blue-500"
            gradientTo="to-cyan-500"
          />
          <AsoLink
            text="Somos Pacientes"
            to="https://www.somospacientes.com"
            gradientFrom="from-red-500"
            gradientTo="to-pink-500"
          />
          <AsoLink
            text="Foro de Pacientes"
            to="https://www.forodepacientes.org"
            gradientFrom="from-indigo-500"
            gradientTo="to-purple-500"
          />
        </div>
      </div>
    </>
  );
};

export default links;
