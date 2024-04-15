import mongoose from "mongoose";

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const PatientAssociationSchema = new Schema({
  associationName: {
    type: String,
    required: [true, "El nombre de la asociación es obligatorio"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "La contraseña es obligatoria"],
  },
  diseaseOrPathology: {
    type: String,
    required: [true, "La enfermedad o patología es obligatoria"],
    trim: true,
    unique: true,
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
  address: {
    type: addressSchema,
    required: [true, "La dirección es obligatoria"],
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        return /^\d{10}$/.test(value); // Formato movil de 9 digitos
      },
      message: "Formato de número de teléfono inválido",
    },
  },
  keywords: {
    type: [String],
    trim: true,
    required: [true, "Las palabras clave son obligatorias"],
  },
  description: String,
});

const PatientAssociation = mongoose.model(
  "PatientAssociation",
  PatientAssociationSchema
);

export default PatientAssociation;
