export const register = async (req, res) => {
  try {
    res.send("register controller");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering the associate" });
  }
};

export const login = async (req, res) => {
  try {
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
