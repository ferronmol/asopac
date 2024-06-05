import RegisterAssociation from "../models/associationModel.js";

export const updateAssociationAddress = async (req, res) => {
  const { id } = req.params;
  const { street, number, city, state, postalCode } = req.body;
  console.log(req.body);
  try {
    const association = await Association.findById(id);
    console.log(association);
    if (!association) {
      return res.status(404).json({ message: "Asociación no encontrada" });
    }
    //Actualiza la dirección de la asociación
    association.address = {
      street,
      number,
      city,
      state,
      postalCode,
    };
    await association.save();
    console.log(association);
    return res.status(200).json({
      message: "Dirección actualizada",
      data: {
        street,
        number,
        city,
        state,
        postalCode,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar la dirección de la asociación",
      error: error.message,
    });
  }
};
