import { Router } from "express";
import userController, {
  login,
  register,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  logoutUser,
} from "../controllers/usersController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js"; // Importar los esquemas de validación
import { validateSchema } from "../middlewares/validatorSchemas.js"; // Importar el middleware de validación
import { logout } from "../controllers/authController.js";

const router = Router();

router.get("/users/info/:id", getUserById);
router.get("/users/:username", getUserByUsername);

router.post("/users/register", validateSchema(createUserSchema), register);
router.post("/users/login", login);
router.post("/users/logout", logoutUser);
router.delete("/users/:id", authRequired, deleteUser);

router.put(
  "/users/:id",
  authRequired,
  validateSchema(updateUserSchema),
  updateUser
);

export default router;
