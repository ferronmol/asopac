import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
import authRoutes from "./routes/auth.routes.js";

// Middleware

app.use(morgan("dev")); // Logs HTTP requests
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use("/v1", authRoutes);
export default app;
