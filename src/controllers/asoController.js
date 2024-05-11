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

    // Si se encuentra la asociación, devolver cierta información pública
    const { associationName: foundAssociationName, email } = associationFound;

    return res.status(200).json({
      message: "Información pública de la asociación",
      data: {
        associationName,
        email,
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
      createdAt: association.timeStamp,
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
