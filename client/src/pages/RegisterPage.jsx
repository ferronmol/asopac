import { useForm } from "react-hook-form";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1 className="text-center mt-5">
        Página de registro de Asociaciones de Pacientes
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mt-5 w-50 mx-auto border p-5 rounded-md"
      >
        <div className="mb-5">
          <label htmlFor="associationName" className="form-label">
            Nombre de la Asociación:
          </label>
          <input
            type="text"
            className="w-full bg-orange-700 text-white, px-4 py-2 rounded-md"
            id="associationName"
            {...register("associationName", {
              required: true,
              minLenght: 3,
              maxLenght: 50,
            })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="form-label">
            Correo Electrónico:
          </label>
          <input
            type="email"
            className="w-full bg-orange-700 text-white, px-4 py-2 rounded-md"
            id="email"
            {...register("email", {
              required: true,
              minLenght: 3,
              maxLenght: 40,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, //Coincide validación del backend
            })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="w-full bg-orange-700 text-white, px-4 py-2 rounded-md"
            id="password"
            {...register("password", {
              required: true,
              minLenght: 6,
              maxLenght: 12,
            })}
          />
        </div>
        <button
          type="submit"
          className="btn bg-green-700 text-white, px-4 py-2 rounded-lg"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
