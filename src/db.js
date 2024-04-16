// Conexión a la base de datos
import mongoose from "mongoose";

export const connect = async () => {
  try {
    console.log("MONGODB_URI:", process.env.URI);

    await mongoose.connect(process.env.URI);
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.log("Error al conectar a la base de datos");
    console.log(error);
  }
};
