import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerRequest } from "../../api/user";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AssociationHeader from "../../components/AssociationHeader";
import { useParams } from "react-router-dom";

function RegisterUserPage() {
  const { associationName } = useParams();
  console.log("Nombre de la asociación que pertenece: ", associationName);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerErrors, setRegisterErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    //console.log("Datos del formulario: ", data);
    try {
      data.createdAt = new Date();
      const res = await registerRequest(data);

      if (res.status === 201) {
        console.log("Respuesta del registro: ", res);
        setSuccessMessage(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error de respuesta: ", error.response.data);
        setRegisterErrors(error.response.data.errors);
      }
      if (error.response && error.response.data.message) {
        console.log("Mensaje de error: ", error.response.data.message);
        setRegisterErrors([error.response.data.message]);
      }
    }
  };

  return (
    <div>
      <AssociationHeader />
      <div>
        <div className="bg-zinc-800 max-w-lg p-10 rounded-md mx-auto mt-10 ">
          <h1 className="text-center mt-5 font-serif text-2xl font-bold">
            Registro de Usuario en Asociaciones de Pacientes
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
            className="container mt-5 w-50 mx-auto border p-5 rounded-md "
          >
            <div className="mb-5">
              <label htmlFor="username" className="form-label">
                Nombre de Usuario
              </label>
              <input
                type="text"
                className="w-full bg-orange-700 text-white, px-4 py-2 rounded-md mt-1"
                id="username"
                {...register("username", {
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                })}
              />
              {errors.username && (
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
                  Este campo es requerido con 6 caracteres mínimo
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
      </div>
    </div>
  );
}

export default RegisterUserPage;
