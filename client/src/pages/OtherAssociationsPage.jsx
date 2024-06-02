import AsoLink from "../components/common/AsoLink";

const others = () => {
  return (
    <>
      <h1 className=" text-center  mt-2 font-serif text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to bg-white ">
        Otras Asociaciones de Pacientes
      </h1>
      <div className="bg-gray-200 p-6 mt-2  rounded-md">
        <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-flow-row gap-4">
          <AsoLink
            text="Asociación Española Contra el Cáncer"
            to="https://www.aecc.es"
            gradientFrom="from-pink-500"
            gradientTo="to-red-500"
          />
          <AsoLink
            text="Asociación Española de Esclerosis Múltiple"
            to="https://www.esclerosismultiple.com"
            gradientFrom="from-purple-500"
            gradientTo="to-indigo-500"
          />
          <AsoLink
            text="Asociación Española de Fibrosis Quística"
            to="https://www.fibrosisquistica.org"
            gradientFrom="from-green-500"
            gradientTo="to-teal-500"
          />
          <AsoLink
            text="Asociación Española de Enfermos de Parkinson"
            to="https://www.fedesparkinson.org"
            gradientFrom="from-yellow-500"
            gradientTo="to-orange-500"
          />
          <AsoLink
            text="Asociación Española de Enfermos de Alzheimer"
            to="https://www.ceafa.es"
            gradientFrom="from-blue-500"
            gradientTo="to-cyan-500"
          />
          <AsoLink
            text="Asociación Española de Enfermos de Esclerosis Lateral Amiotrófica"
            to="https://www.adelaweb.org"
            gradientFrom="from-red-500"
            gradientTo="to-pink-500"
          />
          <AsoLink
            text="Asociación Española de Enfermos de Lupus"
            to="https://www.felupus.org"
            gradientFrom="from-indigo-500"
            gradientTo="to-purple-500"
          />
          <AsoLink
            text="Asociación Española de Enfermos de Crohn y Colitis Ulcerosa"
            to="https://www.accu.org"
            gradientFrom="from-teal-500"
            gradientTo="to-green-500"
          />
          <AsoLink
            text="Asociación Española de Enfermos de Síndrome de Fatiga Crónica"
            to="https://www.sfc.es"
            gradientFrom="from-orange-500"
            gradientTo="to-yellow-500"
          />
          <AsoLink
            text="Asociación Española de Enfermos de Síndrome de Tourette"
            to="https://www.estourette.org"
            gradientFrom="from-cyan-500"
            gradientTo="to-blue-500"
          />
          <AsoLink
            text="Asociación Española de Enfermos de Hemofilia"
            to="https://www.ashec.org"
            gradientFrom="from-purple-500"
            gradientTo="to-pink-500"
          />
          <AsoLink
            text="Asociación Española de Enfermos de Hepatitis"
            to="https://www.aaehepatitis.org"
            gradientFrom="from-green-500"
            gradientTo="to-blue-500"
          />
        </div>
      </div>
    </>
  );
};

export default others;
