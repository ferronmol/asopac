import { Router } from "express";
import authController, {
  login,
  register,
  logout,
  profile,
} from "../controllers/authController.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get(/profile/, authRequired, profile); // Ruta protegida

export default router;
