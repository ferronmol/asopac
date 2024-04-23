import zod from "zod";

const registerSchema = zod.object({
  email: zod
    .string({ required_error: "El correo electrónico es requerido" })
    .min(3, {
      message: "El correo electrónico debe tener al menos 3 caracteres",
    })
    .max(40, {
      message: "El correo electrónico debe tener máximo 40 caracteres",
    })
    .email({ message: "El correo electrónico no es válido" }),

  password: zod
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(40, { message: "La contraseña debe tener máximo 40 caracteres" }),

  associationName: zod
    .string({ required_error: "El nombre de la asociación es requerido" })
    .min(3, {
      message: "El nombre de la asociación debe tener al menos 3 caracteres",
    })
    .max(50, {
      message: "El nombre de la asociación debe tener máximo 50 caracteres",
    }),

  address: zod.string().optional({ message: "La dirección es opcional" }),
  phone: zod.string().optional({ message: "El teléfono es opcional" }),
});

const loginSchema = zod.object({
  email: zod
    .string({ required_error: "El correo electrónico es requerido" })
    .min(3, {
      message: "El correo electrónico debe tener al menos 3 caracteres",
    })
    .max(40, {
      message: "El correo electrónico debe tener máximo 40 caracteres",
    })
    .email({ message: "El correo electrónico no es válido" }),

  password: zod
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(40, { message: "La contraseña debe tener máximo 40 caracteres" }),
});

export { registerSchema, loginSchema };
