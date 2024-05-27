import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import InputForm from "../components/common/InputForm";
import ButtonLink from "../components/common/ButtonLink";
import { addAssociationInfoRequest } from "../api/association";
import { useState } from "react";

const AddInfoPage = () => {
  const { associationName } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [sucessMessage, setSucessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    // Transformar palabras clave en un array
    data.keywords = data.keywords.split(",").map((keyword) => keyword.trim());

    try {
      const response = await addAssociationInfoRequest(data, associationName);
      console.log("Respuesta de la API de asociación: ", response.data);

      if (response.message === "success") {
        alert("Información añadida correctamente");
        setSucessMessage("Información añadida correctamente");
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error al añadir información a la asociación: ", error);
      setSucessMessage("");
      setErrorMessage("Error al añadir información a la asociación");
    }
  };

  return (
    <div>
      <h1 className="text-center mt-2 font-serif text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to bg-white">
        Añadir Información a {associationName || "Nombre por defecto"}
      </h1>
      <div className="bg-zinc-800 max-w-lg pt-10 p-5 rounded-md mx-auto mt-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container w-50 mx-auto border p-5 rounded-md"
        >
          {sucessMessage && <p className="text-green-500">{sucessMessage}</p>}

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-300 mb-2">
              Descripción:
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Este campo es requerido",
              })}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
              placeholder="Asociación de pacientes de enfermos de Alzheimer en Madrid"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <InputForm
            label="Teléfono"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            validation={{
              required: "Este campo es requerido",
              pattern: { value: /^[0-9]+$/, message: "Sólo números" },
            }}
            placeholder="916451618"
          />
          <InputForm
            label="Calle"
            name="street"
            register={register}
            errors={errors}
            validation={{}}
            placeholder="De la Esperanza"
          />
          <InputForm
            label="Número"
            name="number"
            register={register}
            errors={errors}
            validation={{}}
            placeholder="12"
          />
          <InputForm
            label="Ciudad"
            name="city"
            register={register}
            errors={errors}
            validation={{ required: "Este campo es requerido" }}
            placeholder="Las Rozas"
          />
          <InputForm
            label="Provincia"
            name="state"
            register={register}
            errors={errors}
            validation={{ required: "Este campo es requerido" }}
            placeholder="Madrid"
          />
          <InputForm
            label="Código Postal"
            name="postalCode"
            register={register}
            errors={errors}
            validation={{}}
            placeholder="28232"
          />
          <InputForm
            label="Palabras Clave"
            name="keywords"
            register={register}
            errors={errors}
            validation={{ required: "Este campo es requerido" }}
            placeholder="Palabras clave separadas por comas"
          />
          <ButtonLink text="Guardar" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddInfoPage;
