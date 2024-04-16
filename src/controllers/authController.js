import RegisterAssociation from "../models/registerAssociationModel.js";

export const register = async (req, res) => {
  try {
    const { associationName, email, password } = req.body;

    const newRegisterAssociation = new RegisterAssociation({
      associationName,
      email,
      password,
    });

    const savedAssociation = await newRegisterAssociation.save();

    res.status(201).json(savedAssociation); //devuelve el objeto guardado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar la asociación" });
  }
};

export const login = (req, res) => {
  try {
    console.log(req.body);
    res.send("login controller");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in the associate" });
  }
};

export default {
  register,
  login,
};
