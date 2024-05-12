import zod from "zod";
import Address from "../models/addressModel.js";

const addressSchema = zod.object({
  street: zod
    .string({ required_error: "La calle es requerida" })
    .min(3, { message: "La calle debe tener al menos 3 caracteres" })
    .max(50, { message: "La calle debe tener máximo 50 caracteres" }),
  number: zod
    .string({ required_error: "El número es requerido" })
    .min(1, { message: "El número debe tener al menos 1 caracter" })
    .max(10, { message: "El número debe tener máximo 10 caracteres" }),
  city: zod
    .string({ required_error: "La ciudad es requerida" })
    .min(3, { message: "La ciudad debe tener al menos 3 caracteres" })
    .max(50, { message: "La ciudad debe tener máximo 50 caracteres" }),
  state: zod
    .string({ required_error: "La provicia es requerido" })
    .min(3, { message: "La provicia debe tener al menos 3 caracteres" })
    .max(50, { message: "La proviciadebe tener máximo 50 caracteres" }),
  postalCode: zod
    .string({ required_error: "El código postal es requerido" })
    .min(3, { message: "El código postal debe tener al menos 3 caracteres" })
    .max(10, { message: "El código postal debe tener máximo 10 caracteres" }),
});

export default addressSchema;
