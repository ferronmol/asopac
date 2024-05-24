import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import InputForm from "../components/common/InputForm";
import ButtonLink from "../components/common/ButtonLink";

const AddInfoPage = () => {
  const { associationName } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Transformar palabras clave en un array
    data.keywords = data.keywords.split(",").map((keyword) => keyword.trim());
    // Lógica para manejar el envío del formulario
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-center mt-2 font-serif text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to bg-white">
        Añadir Información a su Asociación{" "}
        {associationName || "Nombre por defecto"}
      </h1>
      <div className="bg-zinc-800 max-w-lg pt-10 p-5 rounded-md mx-auto mt-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container w-50 mx-auto border p-5 rounded-md"
        >
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
              placeholder="Descripción de la asociación"
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
            placeholder="Teléfono"
          />
          <InputForm
            label="Calle"
            name="street"
            register={register}
            errors={errors}
            validation={{ required: "Este campo es requerido" }}
            placeholder="Calle"
          />
          <InputForm
            label="Número"
            name="number"
            register={register}
            errors={errors}
            validation={{ required: "Este campo es requerido" }}
            placeholder="Número"
          />
          <InputForm
            label="Ciudad"
            name="city"
            register={register}
            errors={errors}
            validation={{ required: "Este campo es requerido" }}
            placeholder="Ciudad"
          />
          <InputForm
            label="Estado"
            name="state"
            register={register}
            errors={errors}
            validation={{ required: "Este campo es requerido" }}
            placeholder="Estado"
          />
          <InputForm
            label="Código Postal"
            name="postalCode"
            register={register}
            errors={errors}
            validation={{ required: "Este campo es requerido" }}
            placeholder="Código Postal"
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
