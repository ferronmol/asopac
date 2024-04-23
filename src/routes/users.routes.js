import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js"; // Importar los esquemas de validación
import { validateSchema } from "../middlewares/validatorSchemas.js"; // Importar el middleware de validación

const router = Router();

router.get("/users", authRequired, getUsers);

router.get("/users/:id", authRequired, getUserById);

router.post(
  "/users",
  authRequired,
  validateSchema(createUserSchema),
  createUser
);

router.delete("/users/:id", authRequired, deleteUser);

router.put(
  "/users/:id",
  authRequired,
  validateSchema(updateUserSchema),
  updateUser
);

export default router;
