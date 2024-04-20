import User from "../models/userModel.js";
import bcrpt from "bcryptjs";

export const getUsers = async (req, res) => {
  const Users = await User.find();
  res.json(Users);
};
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  //obtener el ID de la asociación desde el token para asignarlo al usuario
  const associationId = req.userId;
  try {
    const passwordHash = await bcrpt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role,
      association: associationId,
      patient: null,
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
        createdAt: userSaved.timeStamp,
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
  const { username, email, password, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password, role },
      { new: true } //Para que retorne el usuario actualizado
    );
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
    res.json("Usuario " + id + " eliminado exitosamente");
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
