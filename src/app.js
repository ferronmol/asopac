import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

//Importo las rutas como modulo
const app = express();
//import UserRoutes from "./routes/UserRoutes.js";
const PORT = process.env.PORT || 9000;

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Definir un enrutador para las rutas de API de Asopac
const apiAsopacRouter = express.Router();
apiAsopacRouter.get("/", (req, res) => {
  res.send("Bienvenido a la API de Asopac");
});
app.get("/", (req, res) => {
  res.send("Bienvenido a  Asopac");
});

// Usar el enrutador con el prefijo '/apiAsopac'
//app.use("/apiAsopac", apiAsopacRouter);
//app.use("/apiAsopac/users", UserRoutes);

export default app;
