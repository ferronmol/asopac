import jwt from "jsonwebtoken";
export const authRequired = async (req, res, next) => {
  try {
    // Verificar si existe el token
    const token = req.cookies.token;
    //console.log(token);
    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }
    // Verificar si el token es válido
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al validar el token" });
  }
};
