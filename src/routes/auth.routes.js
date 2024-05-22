import { Router } from "express";
import authController, {
  login,
  register,
  logout,
  profile,
  verifyToken,
  getAssociationById,
  deleteAssociation,
} from "../controllers/authController.js";
import {
  getAssociationByName,
  getAllAssociations,
} from "../controllers/asoController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorSchemas.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.delete("/association/:associationId", deleteAssociation);

router.get("/verify", verifyToken);
router.get("/association/:associationName", getAssociationByName);
router.get("/association", getAllAssociations);
router.get("/association/id/:associationId", getAssociationById);
router.get(/profile/, authRequired, profile); // Ruta protegida

export default router;
