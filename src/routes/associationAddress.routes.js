import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { updateAssociationAddress } from "../controllers/asoAddressController.js";
import { validateSchema } from "../middlewares/validatorSchemas.js";
import addressSchema from "../schemas/address.schema.js"; // Importa el esquema de validación para la actualización de direcciones
import { verifyToken } from "../controllers/authController.js";

const router = Router();

/**
 * Rutas para la actualización y eliminación de direcciones de asociaciones
 * Mejorar añadiendo autenticación y autorización
 * @module routes/associationAddress
 */

router.put(
  "/association/:id/address",
  validateSchema(addressSchema),
  updateAssociationAddress
);

export default router;
