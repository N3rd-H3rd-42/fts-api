const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  driverLincenseNumber: {
    type: String,
  },
  hasDUI: {
    type: Boolean,
  },
  // clean 39 month MVR
  // NEMT training cert
  // cprCare
  // Fingerprint clearance
  //  HIPPA  cert
  // Defensive driving cert
  // State and NNJ background check
  // DOT exam cert
  registerDate: {
    type: Date,
    default: Date.now(),
  },
});

const ApplicantModel = mongoose.model("applicant", ApplicantSchema);

module.exports = ApplicantModel;
