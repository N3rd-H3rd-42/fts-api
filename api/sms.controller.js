// const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
// const twilioClient = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const PatientModel = require("../models/Patient");

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
    const patientIsPresent = await PatientModel.findOne({ ahcccsId: ahcccsId });
    // console.log(patientIsPresent);
    if (patientIsPresent) {
      const smsBody = `There is a new ride request\nRequester type: ${requesterType}\nFor date and time: ${date} @ ${time}\nPickup location: ${pickup}\nDropoff location: ${destination}\nRider name: ${name}\ncontact number: ${phone}\n`;
      console.log(smsBody);

      // twilioClient.messages.create({ body: 'There is a new ride request', })
      return response.status(200).json({});
    } else {
      return response.status(400).json({});
    }
  },
};
