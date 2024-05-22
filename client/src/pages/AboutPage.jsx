import Header from "../components/Header";

function AboutPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20 bg-slate-500 rounded-md p-2 border-2 border-orange-500">
        <h1 className="text-center mt-5">¿Que es Asopac?</h1>
        <p className="text-center m-10">
          Asopac es una aplicación web que permite a las asociaciones de
          pacientes gestionar sus miembros, eventos y noticias de manera
          sencilla y eficiente.
        </p>
      </div>
      <div className="container mx-auto mt-10 bg-slate-500 rounded-md p-2 border-2 border-orange-500">
        <h1 className="text-center mt-5">Crea una Asociación de Pacientes</h1>
        <p className="text-center m-10">
          Con Asopac solo tendras que hacer clik en el enlace "Crear Asociación"
          para poder crear tu propia asociación de pacientes. Podrás gestionar a
          tus miembros, eventos y noticias de manera sencilla y eficiente.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
