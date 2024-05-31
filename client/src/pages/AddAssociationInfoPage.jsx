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

  const onSubmit = async (formdata) => {
    const data = {
      phone: formdata.phone,
      address: {
        street: formdata.street || "",
        number: formdata.number || "",
        city: formdata.city || "",
        state: formdata.state || "",
        postalCode: formdata.postalCode || "",
      },
      description: formdata.description || "",
      keywords: formdata.keywords.split(",").map((keyword) => keyword.trim()),
    };

    console.log("Data a enviar: ", data);
    try {
      const response = await addAssociationInfoRequest(
        { data },
        associationName
      );
      console.log("Respuesta de la API de asociación: ", response);
      console.log(
        "Mensaje de la API de asociación: ",
        response.message,
        response.success
      );

      if (response && response.success === true) {
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
          <InputForm
            label="Descripción"
            name="description"
            register={register}
            errors={errors}
            validation={{}}
            placeholder="Descripción de la asociación"
          />
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
            placeholder="Las Rozas"
          />
          <InputForm
            label="Provincia"
            name="state"
            register={register}
            errors={errors}
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
