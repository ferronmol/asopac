import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import { logCookies } from "./middlewares/cookieLooger.js";

const app = express();

// Middleware

app.use(morgan("dev")); // Logs HTTP requests
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // Enable CORS

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

app.use(logCookies);

// Routes
app.use("/v1", authRoutes);
app.use("/v1", userRoutes);
export default app;
