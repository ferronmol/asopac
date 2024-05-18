import { Router } from "express";
import userController, {
  login,
  register,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  logout,
} from "../controllers/usersController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js"; // Importar los esquemas de validación
import { validateSchema } from "../middlewares/validatorSchemas.js"; // Importar el middleware de validación

const router = Router();

router.get("/users/info/:id", getUserById);
router.get("/users/:username", getUserByUsername);

router.post("/users/register", validateSchema(createUserSchema), register);
router.post(
  "/users/login",
  authRequired,
  validateSchema(createUserSchema),
  login
);
router.post("/users/logout", logout);
router.delete("/users/:id", authRequired, deleteUser);

router.put(
  "/users/:id",
  authRequired,
  validateSchema(updateUserSchema),
  updateUser
);

export default router;
