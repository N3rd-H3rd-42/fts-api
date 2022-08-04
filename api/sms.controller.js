// const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
// const twilioClient = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const PatientModel = require("../models/Patient");
const TransportationRequestModel = require('../models/TransportationRequest');

module.exports = {
  sendRideRequest: async (request, response) => {
    const {
      requesterType,
      name,
      phone,
      ahcccsId,
      pickup,
      destination,
      date,
      time,
    } = request.body;
    // console.log(request.body);
    const patient = await PatientModel.findOne({ ahcccsId: ahcccsId });
    // console.log(patient);
    if (patient) {
      // const smsBody = `There is a new ride request\nRequester type: ${requesterType}\nFor date and time: ${date} @ ${time}\nPickup location: ${pickup}\nDropoff location: ${destination}\nRider name: ${name}\ncontact number: ${phone}\n`;
      // console.log(smsBody);
      // twilioClient.messages.create({ body: 'There is a new ride request', })
      const requestDate = new Date(`${date}T${time}:00`)
      const newRideRequest = new TransportationRequestModel({ patient: patient._id, requesterType, name, phone, pickup, destination, })
      await TransportationRequestModel.bulkSave([newRideRequest]);

      return response.status(200).json({});
    } else {
      return response.status(400).json({});
    }
  },
};
