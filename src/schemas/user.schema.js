import zod from "zod";

const createUserSchema = zod.object({
  username: zod
    .string({ required_error: "El nombre de usuario es requerido" })
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),
  email: zod
    .string({ required_error: "El correo electrónico es requerido" })
    .min(4, {
      message: "El correo electrónico debe tener un formato válido",
    })
    .max(40, {
      message: "El correo electrónico debe tener máximo 40 caracteres",
    })
    .email({ message: "El correo electrónico no es válido" }),

  password: zod
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(40, { message: "La contraseña debe tener máximo 40 caracteres" }),

  role: zod
    .string()
    .optional()
    .default("user")
    .refine((role) => {
      return ["user", "admin"].includes(role);
    }),
  association: zod.string().nullable().optional(),
  patient: zod.string().nullable().optional(),
});

const updateUserSchema = zod.object({
  username: zod
    .string({
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    })
    .min(3),
  email: zod
    .string({
      message: "El correo electrónico debe tener un formato válido",
    })
    .min(4)
    .max(40, {
      message: "El correo electrónico debe tener máximo 40 caracteres",
    })
    .email({ message: "El correo electrónico no es válido" }),

  password: zod
    .string({ message: "La contraseña debe tener al menos 6 caracteres" })
    .min(6)
    .max(40),
});

export { createUserSchema, updateUserSchema };
