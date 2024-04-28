import * as dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connect } from "./db.js";

const timeZone = process.env.TZ || "Europe/Madrid";
process.env.TZ = timeZone;
console.log(`La zona horaria es: ${timeZone}`);
const PORT = process.env.PORT || 9000;

connect(); // Conexión a la base de datos
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
