import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  street: {
    type: String,
    trim: true,
    required: [true, "La calle es obligatoria"],
  },
  number: {
    type: String,
    trim: true,
    required: [true, "El número es obligatorio"],
  },
  city: {
    type: String,
    trim: true,
    required: [true, "La ciudad es obligatoria"],
  },
  state: {
    type: String,
    trim: true,
    required: [true, "La provincia es obligatorio"],
  },
  postalCode: {
    type: String,
    trim: true,
    required: [true, "El código postal es obligatorio"],
  },
});

const Address = mongoose.model("Address", AddressSchema);

export default Address;
