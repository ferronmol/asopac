import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const { signup, isAuthenticated } = useAuth();
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
          console.log("Respuesta del servidor: ", res);
        }
      }
    } catch (error) {
      console.log("Error del servidor: ", error);
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
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="w-full bg-orange-700 text-white, px-4 py-2 rounded-md mt-1"
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
