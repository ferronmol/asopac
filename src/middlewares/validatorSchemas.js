/**
 * funcion para validar el schema
 * @param {*} schema
 * @returns
 */

export const validateSchema = (schema) => (req, res, next) => {
  try {
    //comparo mi schema con los datos que me llegan en el body
    schema.parse(req.body);
    next();
  } catch (error) {
    console.log;
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};
