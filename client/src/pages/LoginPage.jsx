import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import InputForm from "../components/common/InputForm";
import ButtonLink from "../components/common/ButtonLink";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  //estado para almacenar el nombre de la asociación
  const [associationName, setAssociationName] = useState(null);

  const onSubmit = async (data) => {
    //console.log(data);
    try {
      const res = await signin(data);
      if (res.status === 200) {
        setAssociationName(res.data.data.associationName);
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
  //Uso un useEffect para redirigir al usuario a la página de la asociación si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      console.log(
        "Autenticado cambiado:",
        isAuthenticated,
        "Redirigiendo a: ",
        associationName
      );
      navigate(`/association/${associationName}`);
    }
  }, [isAuthenticated, navigate, associationName]);

  return (
    <div>
      <Header />
      <h1 className=" text-center  mt-2 font-serif text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to bg-white ">
        Login de Asociaciones de Pacientes
      </h1>
      <div className="bg-zinc-800 max-w-lg p-10 rounded-md mx-auto mt-5">
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
            label="Correo Electrónico:"
            type="email"
            name="email"
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
          <Link to="/association/register" className="text-blue-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
