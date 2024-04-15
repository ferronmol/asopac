import { Router } from "express";
import authController, {
  login,
  register,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
