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

router.get("/users", authRequired, getUsers);

router.get("/users/:id", authRequired, getUserById);

router.post("/users", authRequired, createUser);

router.delete("/users/:id", authRequired, deleteUser);

router.put("/users/:id", authRequired, updateUser);

export default router;
