import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

// Middleware

app.use(morgan("dev")); // Logs HTTP requests
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

app.use("/v1", authRoutes);
app.use("/v1", userRoutes);
export default app;
