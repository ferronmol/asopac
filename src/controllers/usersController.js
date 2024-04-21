import User from "../models/userModel.js";
import bcrpt from "bcryptjs";
import { formatDate } from "../libs/formatDate.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      //Solo los usuarios de la asociación que hace la petición
      { association: req.userId }
    ).populate("association");
    if (!users) {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body; //son los campos requeridos
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Faltan campos obligatorios para crear el usuario",
    });
  }
  //obtener el ID de la asociación desde el token para asignarlo al usuario
  const associationId = req.userId;
  try {
    const passwordHash = await bcrpt.hash(password, 10);
    const createdAt = formatDate(new Date());
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role,
      association: associationId,
      patient: null,
      createdAt,
    });
    const userSaved = await newUser.save();
    res.status(201).json({
      message: "Usuario creado exitosamente",
      data: {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        role: userSaved.role,
        association: userSaved.association,
        patient: userSaved.patient,
        createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error });
  }
};

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

export default {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
