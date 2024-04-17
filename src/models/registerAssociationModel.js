import { timeStamp } from "console";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RegisterAssociationSchema = new Schema(
  {
    associationName: {
      type: String,
      required: [true, "El nombre de la asociación es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      trim: true,
      unique: true,
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
    timeStamp: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Associations" } //nombre de la colección en la base de datos
);

const RegisterAssociation = mongoose.model(
  "RegisterAssociation",
  RegisterAssociationSchema
);

export default RegisterAssociation;
