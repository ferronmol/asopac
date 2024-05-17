import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";

const LoginUserPage = () => {
  const { login } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response) {
        // Manejar el registro exitoso, redirigir al usuario a la página de inicio, por ejemplo
      }
    } catch (error) {
      // Manejar errores de registro
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Correo electrónico" />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register("password")}
        type="password"
        placeholder="Contraseña"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Iniciar sesión</button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default LoginUserPage;
