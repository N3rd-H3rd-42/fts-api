const mongoose = require("mongoose");

const TransportationRequestSchema = new mongoose.Schema({
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
  requestDate: {
    type: Date,
  },
  ahcccsId: {
    type: String,
  },
  facilityLocation: {
    type: String,
  },
  patientsName: {
    type: String,
  }
});

const TransportationRequestModel = mongoose.model(
  "transportation_request",
  TransportationRequestSchema
);

module.exports = TransportationRequestModel;
