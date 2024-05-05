import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    //console.log(data);
    try {
      const res = await signin(data);
      if (res.status === 200) {
        const associationName = res.data.data.associationName;
        if (isAuthenticated === true) {
          navigate(`/association/${associationName}`);
        } else {
          console.log("Fallo la autenticación");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error de respuesta: ", error.response.data);
      }
    }
  };

  return (
    <div className="bg-zinc-800 max-w-lg p-10 rounded-md mx-auto mt-10">
      <h1 className="text-center mt-5 font-serif text-2xl font-bold">
        Login de Asociaciones de Pacientes
      </h1>

      {loginErrors && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
          role="alert"
        >
          <ul>
            {loginErrors.map((error, index) => (
              <li key={index}>{error.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)} // Llama a la función onSubmit
        className="container mt-5 w-50 mx-auto border p-5 rounded-md"
      >
        <div className="mb-5">
          <label htmlFor="email" className="form-label">
            Correo Electrónico:
          </label>
          <input
            type="email"
            className="w-full bg-orange-700 text-white, px-4 py-2 rounded-md mt-1"
            id="email"
            {...register("email", {
              required: true,
              minLenght: 3,
              maxLenght: 40,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, //Coincide validación del backend
            })}
          />
          {errors.email && (
            <span className="text-red-600">Introduzca un mail válido</span>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="w-full bg-orange-700 text-white, px-4 py-2 rounded-md mt-1"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="* * * * * *"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
          />
          {errors.password && (
            <span className="text-red-600">
              Este campo es requerido con 6 caracteres mínimo
            </span>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-green-700 text-white, px-4 py-2 rounded-lg"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
