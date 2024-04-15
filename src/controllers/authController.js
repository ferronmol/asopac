import RegisterAssociation from "../models/registerAssociationModel.js";

export const register = (req, res) => {
  try {
    const { associationName, email, password } = req.body;

    new RegisterAssociation({
      associationName,
      email,
      password,
    }).save();

    res.send("Registro de asociación exitoso");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering the associate" });
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
