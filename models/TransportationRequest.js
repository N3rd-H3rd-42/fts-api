const mongoose = require("mongoose");

const TransportationRequestSchema = new mongoose.Schema({
  dateTimeOFCall: {
    type: Date,
  },
  callersName: {
    type: String,
  },
  companyName: {
    type: String,
  },
  dateOfAppointment: {
    type: Date,
  },
  refferingProvider: {
    type: String,
  },
  reasonForAppointment: {
    type: String,
  },
  specialInsructions: {
    type: String,
  },
  caseManagerName: {
    type: Boolean,
  },
  // above ???????????
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  // db ref one to many
  patientId: {
    type: mongoose.ObjectId,
    ref: "patient",
  },
  // below is based on frontend request form
  requesterType: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  pickup: {
    type: String,
  },
  destination: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const TransportationRequestModel = mongoose.model(
  "transportation_request",
  TransportationRequestSchema
);

module.exports = TransportationRequestModel;
