import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
import authRoutes from "./routes/auth.routes.js";

// Middleware
app.use(morgan("dev"));
app.use(authRoutes);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export default app;
