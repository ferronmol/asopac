import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RegisterAssociationSchema = new Schema({
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
    password: {
      type: String,
      trim: true,
      required: [true, "La contraseña es obligatoria"],
    },
  },
});

const RegisterAssociation = mongoose.model(
  "RegisterAssociation",
  RegisterAssociationSchema
);

export default RegisterAssociation;
