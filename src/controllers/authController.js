import Association from "../models/associationModel.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { formatDate } from "../libs/formatDate.js";
import jwt from "jsonwebtoken";
import { updateAssociationAddress } from "./asoAddressController.js";

/**
 *  Función para registrar una asociaci?n
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const register = async (req, res) => {
  const { associationName, email, password } = req.body;
  const errors = [];
  try {
    //primero que busque si ya existe una asociación con el mismo correo
    const associationFound = await Association.findOne({
      email,
    });
    if (associationFound) {
      errors.push("  El correo electrónico ya está en uso    ");
    }
    //tampooco se puede registrar una asociación con el mismo nombre
    const associationNameFound = await Association.findOne({
      associationName,
    });
    if (associationNameFound) {
      errors.push("  El nombre de la asociación ya existe    ");
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newAssociation = new Association({
      associationName,
      email,
      password: passwordHash,
      address: req.body.adress || null,
      phone: req.body.phone || null,
      //description: req.body.description || "",
      //Keywords: req.body.Keywords || [],
    });

    const savedAssociation = await newAssociation.save();

    /**
     * Guardamos el token en una cookie para que el usuario pueda navegar por la aplicacion
     */
    const token = await createAccessToken({ id: savedAssociation._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });

    //formateo la fecha de creación
    const formattedCreateDate = formatDate(savedAssociation.createdAt);

    res.status(201).json({
      message: "Asociación registrada exitosamente",
      data: {
        id: savedAssociation._id,
        associationName: savedAssociation.associationName,
        email: savedAssociation.email,
        createdAt: formattedCreateDate,
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
/**
 * Funcion para iniciar sesion una asociacion
 * @param {} req
 * @param {*} res
 * @returns
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  try {
    //primero ve si existe la asociación
    const associationFound = await Association.findOne({ email });
    if (!associationFound) {
      errors.push(" Asociación o contraseña incorrecta");
    }
    //rompo la ejecución si hay este error
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    // si existe la asociacion entonces compara la contraseña

    const passwordMatch = await bcrypt.compare(
      password,
      associationFound.password
    );
    if (!passwordMatch) {
      errors.push("  Asociación o contraseña incorrecta    ");
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }
    //si todo está bien entonces crea el token

    const token = await createAccessToken({ id: associationFound._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: {
        id: associationFound._id,
        associationName: associationFound.associationName,
        email: associationFound.email,
        createdAt: associationFound.createdAt,
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

/**
 *  función para cerrar la sesión de la asociación
 * @param {*} req
 * @param {*} res
 */
export function logout(req, res) {
  res.cookie("token", "", { maxAge: 1 }); //masAge 1 para que expire inmediatamente
  res.status(200).json({ message: "Sesión cerrada" });
}

export const profile = async (req, res) => {
  try {
    const associationFound = await Association.findById(req.userId);
    if (!associationFound) {
      return res.status(404).json({ message: "Asociación no encontrada" });
    }
    return res.status(200).json({
      message: "Perfil de la asociación",
      data: {
        id: associationFound._id,
        associationName: associationFound.associationName,
        email: associationFound.email,
        createdAt: associationFound.createdAt,
        description: associationFound.description || "",
        keywords: associationFound.keywords || [],
        updatedAt: associationFound.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el perfil de la asociación",
      error: error.message,
    });
  }
};

/**
 * Función para verificar el token
 */
export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    jwt.verify(token, process.env.SECRET, async (error, asociacion) => {
      if (error) {
        return res.status(401).json({ message: "Token no válido" });
      }
      const associationFound = await Association.findById(asociacion.id);
      if (!associationFound) {
        return res.status(404).json({ message: "Asociación no encontrada" });
      }
      return res.status(200).json({
        message: "Perfil de la asociación",
        data: {
          id: associationFound._id,
          associationName: associationFound.associationName,
          email: associationFound.email,
          createdAt: associationFound.createdAt,
          description: associationFound.description || "",
          keywords: associationFound.keywords || [],
          updatedAt: associationFound.updatedAt,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al verificar el token",
      error: error.message,
    });
  }
};

/**
 * Función para obtener la información de una asociación por su Id
 */

export const getAssociationById = async (req, res) => {
  try {
    const associationFound = await Association.findById(
      req.params.associationId
    );
    if (!associationFound) {
      return res.status(404).json({ message: "Asociación no encontrada" });
    }
    return res.status(200).json({
      message: "Perfil de la asociación",
      data: {
        id: associationFound._id,
        associationName: associationFound.associationName,
        email: associationFound.email,
        Telefono: associationFound.phone,
        Direccion: associationFound.address,
        createdAt: associationFound.createdAt,
        Descripcion: associationFound.description || "",
        Keywords: associationFound.Keywords || [],
        updatedAt: associationFound.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el perfil de la asociación",
      error: error.message,
    });
  }
};

/**
 * funcion para borrar una asociación
 *
 */

export const deleteAssociation = async (req, res) => {
  try {
    const associationFound = await Association.findByIdAndDelete(
      req.params.associationId
    );
    if (!associationFound) {
      return res.status(404).json({ message: "Asociación no encontrada" });
    }
    return res.status(200).json({
      message: "Asociación eliminada",
      data: {
        id: associationFound._id,
        associationName: associationFound.associationName,
        email: associationFound.email,
        createdAt: associationFound.createdAt,
        updatedAt: associationFound.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar la asociación",
      error: error.message,
    });
  }
};
export default {
  register,
  login,
  logout,
  profile,
  verifyToken,
  getAssociationById,
  deleteAssociation,
};
