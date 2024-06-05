import User from "../models/userModel.js";
import Patient from "../models/patientModel.js";
import bcrypt from "bcryptjs";
import { formatDate } from "../libs/formatDate.js";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";
import { logout } from "./authController.js";
import { error } from "console";
import { create } from "domain";

/**
 * Función para registra un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const register = async (req, res) => {
  const { username, email, password, role, association } = req.body;
  console.log(req.body);
  const errors = [];
  try {
    // primero veo si ya existe un usuario con el mismo correo
    const userFound = await User.findOne({
      email,
    });
    if (userFound) {
      errors.push("  El correo electrónico ya está registrado    ");
    }
    //tampooco se puede registrar un usuario con el mismo nombre
    const usernameFound = await User.findOne({
      username,
    });
    if (usernameFound) {
      errors.push("  El nombre de usuario ya existe    ");
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Faltan campos obligatorios para crear el usuario",
      });
    }
    // si existe un token de asociacion obtener el ID de la asociación desde el token para asignarlo al usuario
    let associationId = null;
    if (req.userId) {
      associationId = req.userId;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const createdAt = formatDate(new Date());
    //creo el nuevo usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role,
      association: association || [],
      patient: null,
    });
    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("tokenUser", token, {
      sameSite: "none",
      secure: true,
    });
    //formateo la fecha de creación
    const formattedDate = formatDate(userSaved.createdAt);
    res.status(201).json({
      message: "Usuario creado exitosamente",
      data: {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        role: userSaved.role,
        association: userSaved.association,
        patient: userSaved.patient,
        createdAt: formattedDate,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error });
  }
};
/**
 * Función para iniciar sesión de un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  try {
    //validar si el usuario existe
    const userFound = await User.findOne({ email })
      .populate("association")
      .populate("patient");
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    //si existe el usuario validar la contraseña
    const isValidPassword = await bcrypt.compare(password, userFound.password);
    if (!isValidPassword) {
      errors.push("Contraseña incorrecta");
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }
    //si todo bien generar token de acceso
    const token = await createAccessToken({ id: userFound._id });

    //construyo el objeto de respuesta
    const responseData = {
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      association: userFound.association,
      patient: userFound.patient,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    };

    res.cookie("tokenUser", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({
      message: "Bienvenido",
      data: {
        responseData,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
};

/**
 * función para obtener un usuario por su ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({
      message: "Usuario encontrado",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error });
  }
};

/**
 *  Función para actualizar un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */

/**
 * Funcion para oberner un usuario por su nombre de usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const {
      _id,
      username: usernameFound,
      email,
      role,
      association,
      patient,
      createdAt,
    } = userFound;

    return res.status(200).json({
      message: "Usuario encontrado",
      data: {
        id: _id,
        username: usernameFound,
        email,
        role,
        association,
        patient,
        createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body; //solo se pueden actualizar estos campos
  //validamos campos obligatorios
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Faltan campos obligatorios para actualizar el usuario",
    });
  }

  if (!id) {
    return res.status(400).json({
      message: "El ID del usuario es obligatorio",
    });
  }
  try {
    //actualizar solo los campos enviados
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (password) {
      const passwordHash = await bcrpt.hash(password, 10);
      updateFields.password = passwordHash;
    }
    //actualizar la fecha de modificación
    updateFields.updatedAt = formatDate(new Date());

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } //Para que retorne el usuario actualizado
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({
      message: "Usuario actualizado exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el usuario", error: error });
  }
};

/**
 *  Función para eliminar un usuario
 * @param {*} req
 * @param {*} res
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(204).json("Usuario " + id + " eliminado exitosamente");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario " + id, error: error });
  }
};

/**
 * Función para cerrar la sesión de un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const logoutUser = async (req, res) => {
  res.clearCookie("tokenUser");
  res.json({ message: "Sesión cerrada exitosamente" });
};

export default {
  register,
  getUserById,
  updateUser,
  deleteUser,
  getUserByUsername,
  login,
  logoutUser,
};
