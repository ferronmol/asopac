import { Router } from "express";
import userController, {
  login,
  register,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js"; // Importar los esquemas de validación
import { validateSchema } from "../middlewares/validatorSchemas.js"; // Importar el middleware de validación

const router = Router();

router.get("/users", authRequired, getAllUsers);

router.get("/users/:id", authRequired, getUserById);

router.post("/users/register", validateSchema(createUserSchema), register);
router.post(
  "/users/login",
  authRequired,
  validateSchema(createUserSchema),
  login
);

router.delete("/users/:id", authRequired, deleteUser);

router.put(
  "/users/:id",
  authRequired,
  validateSchema(updateUserSchema),
  updateUser
);

export default router;
