import { Router } from "express";
import authController, {
  login,
  register,
  logout,
  profile,
} from "../controllers/authController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorSchemas.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

router.get(/profile/, authRequired, profile); // Ruta protegida

export default router;
