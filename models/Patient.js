const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  ahcccsId: {
    type: String,
    unique: true,
  },
  locationName: {
    type: String,
  },
  locationAdress: {
    type: String,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  preffedDriver: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  registerDate: {
    type: Date,
    default: Date.now(),
  },
});

const PatientModel = mongoose.model("patient", PatientSchema);

module.exports = PatientModel;
