import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  //console.log("Errores de registro: ", registerErrors);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    //console.log("Datos del formulario: ", data);
    try {
      data.createdAt = new Date();
      const res = await signup(data);

      if (res.status === 201) {
        const associationName = res.data.data.associationName;
        setSuccessMessage(res.data.message);
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
        Registro de Asociaciones de Pacientes
      </h1>
      {successMessage && (
        <div className="alert alert-success mt-5" role="alert">
          {successMessage}
        </div>
      )}
      {registerErrors && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
          role="alert"
        >
          <ul>
            {registerErrors.map((error, index) => (
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
          <label htmlFor="associationName" className="form-label">
            Nombre de la Asociación:
          </label>
          <input
            type="text"
            className="w-full bg-orange-700 text-white, px-4 py-2 rounded-md mt-1"
            id="associationName"
            {...register("associationName", {
              required: true,
              minLenght: 3,
              maxLenght: 50,
            })}
          />
          {errors.associationName && (
            <span className="text-red-600">Este campo es requerido</span>
          )}
        </div>
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
            <span className="text-red-600">Este campo es requerido</span>
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
              Este campo es requerido con 6 caracteres"
            </span>
          )}
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
