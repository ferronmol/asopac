import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
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
    //Relacion con el modelo de Paciente
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  //Fecha de creación del usuario
  {
    timeStamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  registerAss

  { collection: "Users" } //nombre de la colección en la base de datos
);

const User = mongoose.model("User", UserSchema);

export default User;
