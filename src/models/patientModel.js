const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v > 0 && v < 120;
      },
      message: "La edad debe ser mayor a 0 y menor a 120",
    },
  },
  diagnosis: {
    type: String,
  },
  // Relación con el modelo de Usuario
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
