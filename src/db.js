// Conexión a la base de datos
import mongoose from "mongoose";

const uri =
  "mongodb+srv://adminAsopac:adminAsopac01@cluster0.dtcfg4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connect = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.log("Error al conectar a la base de datos");
    console.log(error);
  }
};
