import RegisterAssociation from "../models/registerAssociationModel.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { associationName, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newRegisterAssociation = new RegisterAssociation({
      associationName,
      email,
      password: passwordHash,
    });

    const savedAssociation = await newRegisterAssociation.save();
    const token = await createAccessToken({ id: savedAssociation._id });
    res.cookie("token", token);
    res.status(201).json({
      message: "Asociación registrada exitosamente",
      data: {
        id: savedAssociation._id,
        associationName: savedAssociation.associationName,
        email: savedAssociation.email,
        createdAt: savedAssociation.timeStamp,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al registrar la asociación",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const associationFound = await RegisterAssociation.findOne({ email });
    if (!associationFound) {
      return res
        .status(400)
        .json({ message: "Correo electrónico o contraseña incorrectos" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      associationFound.password
    );
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Correo electrónico o contraseña incorrectos" });
    }
    const token = await createAccessToken({ id: associationFound._id });
    res.cookie("token", token);
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: {
        id: associationFound._id,
        associationName: associationFound.associationName,
        email: associationFound.email,
        createdAt: associationFound.timeStamp,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

export function logout(req, res) {
  res.cookie("token", "", { maxAge: 1 }); //masAge 1 para que expire inmediatamente
  res.status(200).json({ message: "Sesión cerrada" });
}

export function profile(req, res) {
  res.status(200).json({ message: "Perfil de la asociación" });
}
export default {
  register,
  login,
  logout,
  profile,
};
