import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import InputForm from "../../components/common/InputForm";
import ButtonLink from "../../components/common/ButtonLink";

const LoginUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, isAuthenticated, errors: loginErrors } = useUser();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const res = await login(data);
      if (res.status === 200) {
        setUser(res.data.data.userName);
        if (isAuthenticated === true) {
          navigate(`/association/${res.data.data.associationName}`);
        } else {
          console.log("Fallo la autenticación");
          console.log("user", user);
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error de respuesta: ", error.response.data);
      }
    }
  };
  //useEffect para redirigir al usuario a la página de usuario si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/association/${user.associationName}`);
      console.log("El usuario tiene autenticacion: ", isAuthenticated);
      console.log("El usuario es: ", user);
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <div>
      <div className="bg-zinc-800 max-w-lg p-10 rounded-md mx-auto mt-10">
        <h1 className="text-center mt-5 font-serif text-2xl font-bold">
          Login de Usuario en Asociaciones de Pacientes
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
          <InputForm
            label="Correo Electrónico"
            type="email"
            register={register}
            name="email"
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
            placeholder={"ejemplocorreo@gmail.com"}
            autoComplete={"username"}
          />
          <InputForm
            label="Contraseña"
            name="password"
            type="password"
            register={register}
            errors={errors}
            autoComplete="new-password"
            placeholder="* * * * * *"
            validation={{
              required: "Este campo es requerido",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
              maxLength: { value: 40, message: "Máximo 40 caracteres" },
            }}
          />
          <ButtonLink text="Entrar" type="submit" />
        </form>
        <p className="text-center mt-5">
          ¿No tienes cuenta?{" "}
          <Link to="/users/register" className="text-blue-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginUserPage;
