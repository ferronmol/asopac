// Función para mostrar la información pública de una asociación por su nombre
import RegisterAssociation from "../models/registerAssociationModel.js";

export const getAssociationByName = async (req, res) => {
  const { associationName } = req.params; // Obtener el nombre de la asociación de los parámetros de la URL
  try {
    // Buscar la asociación por su nombre
    const associationFound = await RegisterAssociation.findOne({
      associationName,
    });

    if (!associationFound) {
      // Si no se encuentra la asociación, devolver un mensaje de error
      return res.status(404).json({ message: "Asociación no encontrada" });
    }

    // Si se encuentra la asociación, devolver cierta información
    const {
      associationName: foundAssociationName,
      email,
      phone,
      address,
    } = associationFound;

    return res.status(200).json({
      message: "Información pública de la asociación",
      data: {
        associateId: associationFound._id,
        associationName,
        email,
        phone,
        address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener información de la asociación",
      error: error.message,
    });
  }
};

export const getAllAssociations = async (req, res) => {
  try {
    const associations = await RegisterAssociation.find();

    if (!associations) {
      return res.status(404).json({ message: "No hay asociaciones" });
    }

    const associationsList = associations.map((association) => ({
      id: association._id,
      association: association.associationName,
      email: association.email,
      phone: association.phone,
      address: association.address,
      createdAt: association.createdAt,
    }));

    return res.status(200).json({
      message: "Lista de asociaciones",
      data: associationsList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener la lista de asociaciones",
      error: error.message,
    });
  }
};

/**
 * Funcion para añadir información de una asociación
 * @param {Object} req - Request object con associationname y data
 * @param {Object} res - Response object
 */
export const addAdditionalInfo = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { associationName } = req.params;
    const { data } = req.body;

    // Verificar si la asociación existe
    const association = await RegisterAssociation.findOne({ associationName });
    if (!association) {
      return res
        .status(404)
        .json({ success: false, message: "Asociación no encontrada" });
    }

    // actualiza la información adicional de la asociación
    association.description = data.description || "";
    association.Keywords = data.Keywords || [];

    association.phone = data.phone || "";
    association.address = data.address || "";

    // Guardar los cambios en la base de datos
    await association.save();

    // Responder con éxito
    return res.status(200).json({
      success: true,
      message: "Información adicional agregada correctamente",
    });
  } catch (error) {
    // Manejar errores
    console.error("Error al agregar información adicional:", error);
    return res.status(500).json({
      success: false,
      message: "Error del servidor al agregar información adicional",
    });
  }
};
