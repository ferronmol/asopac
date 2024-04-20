import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const newUser = new User({
      username,
      email,
      password,
      role,
    });
    const userSaved = await newUser.save();
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", user: userSaved });
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
    res.json("Usuario encontrado, user");
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
