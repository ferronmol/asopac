import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import InputForm from "../../components/common/InputForm";
import ButtonLink from "../../components/common/ButtonLink";
import { useUser } from "../../context/UserContext";

function RegisterUserPage() {
  const { associationName } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { signupUser, errors: regErrors } = useUser();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    //console.log("Datos del formulario: ", data);
    console.log("Nombre de la asociación: ", associationName);
    try {
      data.createdAt = new Date();

      const res = await signupUser(data, associationName);
      console.log("Respuesta del servidor: ", res);
      console.log("Datos del usuario registrado: ", res.data.data);
      console.log("Errores de registro: ", regErrors);

      if (res && res.status === 201) {
        const username = res.data.data.username;
        console.log(
          "Usuario registrado: ",
          username,
          " con mail ",
          res.data.data.email,
          " en la asociación ",
          associationName
        );

        setSuccessMessage(res.data.message);
        navigate(`/association/${associationName}/members`);
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
      <div>
        <div className="bg-zinc-800 max-w-lg p-10 rounded-md mx-auto mt-10 ">
          <h1 className="text-center mt-5 font-serif text-2xl font-bold">
            Registro de Usuario en Asociaciones de Pacientes
          </h1>
          {successMessage && (
            <div
              className="alert alert-success mt-5 bg-green-700 text-white, px-4 py-2 rounded-lg"
              role="alert"
            >
              {successMessage}
            </div>
          )}
          {regErrors && regErrors.length > 0 && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
              role="alert"
            >
              <ul>
                {regErrors.map((error, index) => (
                  <li key={index}>{error.trim()}</li>
                ))}
              </ul>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)} // Llama a la función onSubmit
            className="container mt-5 w-50 mx-auto border p-5 rounded-md "
          >
            <InputForm
              label="Nombre de Usuario"
              type="text"
              register={register}
              name="username"
              autoComplete="username"
              errors={errors}
              validation={{
                required: true,
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              }}
            />
            <InputForm
              label="Correo Electrónico"
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              register={register}
              errors={errors}
              validation={{
                required: true,
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                maxLength: { value: 40, message: "Máximo 40 caracteres" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo inválido",
                },
              }}
            />
            <InputForm
              label="Contraseña"
              type="password"
              name="password"
              autoComplete="new-password"
              register={register}
              errors={errors}
              validation={{
                required: true,
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                maxLength: { value: 20, message: "Máximo 20 caracteres" },
              }}
            />
            <InputForm
              label="Confirmar Contraseña"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              register={register}
              errors={errors}
              validation={{
                required: "Este campo es requerido",
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              }}
            />
            <ButtonLink text="Registrase" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUserPage;
