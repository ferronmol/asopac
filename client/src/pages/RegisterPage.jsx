import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import InputForm from "../components/common/InputForm";
import ButtonLink from "../components/common/ButtonLink";

function RegisterPage() {
  const { associationName } = useParams();
  console.log("Nombre de la asociación en registerpage: ", associationName);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  console.log("Nombre de la asociación: ", associationName);
  console.log("autenticado: ", isAuthenticated);

  const onSubmit = async (data) => {
    try {
      data.createdAt = new Date();
      const res = await signup(data);

      if (res.status === 201) {
        const associationName = res.data.data.associationName;
        setSuccessMessage(res.data.message);

        console.log("estado de autenticación: ", isAuthenticated);
        if (isAuthenticated === true) {
          console.log("Autenticación correcta, redirigiendo...");
          navigate(`/association/${encodeURIComponent(associationName)}`);
        } else {
          console.log("Fallo la autenticación");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error de respuesta: ", error.response.data);
      }
      if (error.response && error.response.data.message) {
        console.log("Mensaje de error: ", error.response.data.message);
      }
    }
  };

  return (
    <div>
      <Header associationName={associationName || "Nombre por defecto"} />
      <h1 className=" text-center  mt-2 font-serif text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to bg-white ">
        Registro de Asociaciones de Pacientes
      </h1>
      <div className="bg-zinc-800 max-w-lg pt-10 p-5 rounded-md mx-auto mt-2">
        {successMessage && (
          <div className="alert alert-success mt-5" role="alert">
            {successMessage}
          </div>
        )}
        {registerErrors && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative "
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
          onSubmit={handleSubmit(onSubmit)}
          className="container  w-50 mx-auto border p-5 rounded-md"
        >
          <InputForm
            label="Nombre de la Asociación"
            name="associationName"
            register={register}
            errors={errors}
            validation={{
              required: "Este campo es requerido",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
              maxLength: { value: 40, message: "Máximo 40 caracteres" },
            }}
            placeholder="Nombre de la Asociación"
            autoComplete="organization"
          />
          <InputForm
            label="Correo Electrónico"
            name="email"
            type="email"
            register={register}
            errors={errors}
            validation={{
              required: "Este campo es requerido",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
              maxLength: { value: 40, message: "Máximo 40 caracteres" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo inválido",
              },
            }}
            placeholder="Correo Electrónico"
            autoComplete="username"
          />
          <InputForm
            label="Contraseña"
            name="password"
            type="password"
            id="password"
            register={register}
            errors={errors}
            autoComplete="new-password"
            placeholder="* * * * * *"
            validation={{
              required: "Este campo es requerido",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
              maxLength: { value: 20, message: "Máximo 20 caracteres" },
            }}
          />
          <InputForm
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            register={register}
            id="confirmPassword"
            errors={errors}
            autoComplete="new-password"
            placeholder="* * * * * *"
            validation={{
              required: "Este campo es requerido",
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            }}
          />
          <ButtonLink text="Registrarse" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
