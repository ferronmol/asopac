// Conexión a la base de datos
import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(
      process.env.URI || "mongodb://localhost:27017/asopac",
      {
        dbName: process.env.DB_NAME,
      }
    ); // esto hace la conexión a la base de datos en mongo atlas o en local
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.log("Error al conectar a la base de datos");
    console.log(error);
  }
};
