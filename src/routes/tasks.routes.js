import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = Router();

router.get("/users", authRequired, (req, res) => {
  res.send("Usuarios de la aplicación");
});
router.get("/users/:id", authRequired, (req, res) => {
  res.send("Usuario de la aplicación");
});
router.post("/users", authRequired, (req, res) => {
  res.send("Crear usuario de la aplicación");
});
router.delete("/users/:id", authRequired, (req, res) => {
  res.send("Borrar usuario de la aplicación");
});
router.put("/users/:id", authRequired, (req, res) => {
  res.send("Actualizar usuario de la aplicación");
});

export default router;
