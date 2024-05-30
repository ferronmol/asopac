import mongoose from "mongoose";
import Address from "./addressModel.js";

const Schema = mongoose.Schema;

const RegisterAssociationSchema = new Schema(
  {
    associationName: {
      type: String,
      trim: true,
      unique: [true, "El nombre de la asociación ya existe"],
      required: [true, "El nombre de la asociación es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      trim: true,
      unique: [true, "El correo electrónico ya está registrado"],
      validate: {
        validator: (value) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Formato de correo electrónico inválido",
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "La contraseña es obligatoria"],
      validate: {
        validator: (value) => {
          return value.length >= 6;
        },
        message: "La contraseña debe tener al menos 6 caracteres",
      },
    },
    address: Address.schema,

    phone: {
      type: String,
      check(value) {
        return value.length >= 9;
      },
      trim: true,
      message: "El teléfono debe tener al menos 9 caracteres",
    },
    description: {
      type: String,
      default: "",
      message: "La descripción es muy importante",
    },
    Keywords: {
      type: Array,
      default: [],
      message: "Las palabras clave son muy importantes",
    },
    createdAt: {
      type: Date,
      // En zona horaria UTC + 2
      default: () => new Date(Date.now() + 7200000),
    },
  },
  {
    timestamps: true,
  },
  { collection: "Associations" } //nombre de la colección en la base de datos
);

const RegisterAssociation = mongoose.model(
  "RegisterAssociation",
  RegisterAssociationSchema
);

export default RegisterAssociation;
