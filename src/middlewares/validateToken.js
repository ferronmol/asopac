import jwt from "jsonwebtoken";

/**
 * Esta función verifica si existe un token en las cookies de la petición y si es válido.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authRequired = async (req, res, next) => {
  try {
    // Verificar si existe el token
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "No autorizado, no existe token" });
    }
    // Verificar si el token es válido
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expirado" });
        }
        console.log(error, decoded);
        return res.status(401).json({ message: "Token no válido" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error("Error al validar el token:", error);
    res.status(500).json({ message: "Error al validar el token" });
  }
};
