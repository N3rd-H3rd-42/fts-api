const TransportationRequestModel = require("../models/TransportationRequest");

module.exports = {
  getAll: async (request, response) => {
    try {
      const rideRequests = await TransportationRequestModel.find();
      return response.status(200).json({ data: rideRequests });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ data: error });
    }
  },
  getOne: async (request, response) => {
    try {
      const rideRequest = await TransportationRequestModel.findById(
        request.params.id
      );
      if (rideRequest) return response.status(200).json({ data: rideRequest });
    } catch (error) {
      console.log(error);
      return response
        .status(404)
        .json({ message: "Can not find ride request by id", data: error });
    }
  },
  createOne: async (request, response) => {
    try {
      const {
        requesterType,
        name,
        phone,
        ahcccsId,
        pickup,
        destination,
        date,
        time,
        facilityLocation,
        patientsName,
      } = request.body;
      const requestDate = new Date(`${date}T${time}:00`);
      const newRideRequest = new TransportationRequestModel({
        requesterType,
        name,
        phone,
        ahcccsId,
        pickup,
        destination,
        requestDate,
        facilityLocation,
        patientsName,
      })
      await TransportationRequestModel.bulkSave([newRideRequest]);
      return response.status(200).json({ data: newRideRequest })
    } catch (error) {
      return response
        .status(500)
        .json({ message: `error processing request`, data: error });
    }
  },
};
