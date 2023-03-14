const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER, ADMIN_NUMBER } =
  process.env;
const twilioClient = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const TransportationRequestModel = require("../models/TransportationRequest");

const formatTimeString = (timeString) => {
  const hourMinuteArray = timeString.split(":");
  return +hourMinuteArray[0] > 12
    ? `${+hourMinuteArray[0] - 12}:${hourMinuteArray[1]} PM`
    : `${timeString} AM`;
};

module.exports = {
  sendRideRequest: async (request, response) => {
    const {
      requesterType,
      name,
      phone,
      ahcccsId,
      pickup,
      birthdate,
      destination,
      date,
      time,
      facilityLocation,
      patientsName,
    } = request.body;
    const smsBody = `There is a new ride request\nRequester type: ${requesterType}\nFor date and time: ${date} @ ${formatTimeString(
      time
    )}\nPickup location: ${pickup}\nDropoff location: ${destination}\nRequester name: ${name}\nAHCCCS ID:${ahcccsId}\ncontact number: ${phone}${
      facilityLocation ? `\nfacility location: ${facilityLocation}` : ""
    }${patientsName ? `\npatients name: ${patientsName}` : ""}`;
    twilioClient.messages
      .create({
        body: smsBody,
        from: TWILIO_NUMBER,
        to: ADMIN_NUMBER,
      })
      .then(async (message) => {
        const requestDate = new Date(`${date}T${time}:00`);
        const newRideRequest = new TransportationRequestModel({
          // patient: patient._id,
          requesterType,
          name,
          phone,
          birthdate,
          pickup,
          destination,
          requestDate,
          ahcccsId,
          facilityLocation,
          patientsName,
        });
        await TransportationRequestModel.bulkSave([newRideRequest]);
        return response.status(200).json({});
      })
      .catch((error) => {
        console.log(error);
        return response.status(500).json({ message: "SMS gateway error" });
      });
  },
};
