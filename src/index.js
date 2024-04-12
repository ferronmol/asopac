const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const cors = require("cors");
const UserRoutes = require("./Routes/UserRoutes");
const app = express();
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
app.use("/apiAsopac", apiAsopacRouter);
app.use("/apiAsopac/users", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
