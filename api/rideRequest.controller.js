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
    console.log(request.body, request, response, 'CREATE API')
    try {
      const {
        requesterType,
        name,
        phone,
        birthdate,
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
        birthdate,
        ahcccsId,
        pickup,
        destination,
        requestDate,
        facilityLocation,
        patientsName,
      });
      await TransportationRequestModel.bulkSave([newRideRequest]);
      return response.status(201).json({ data: newRideRequest });
    } catch (error) {
      return response
        .status(500)
        .json({ message: `error processing request`, data: error });
    }
  },
  updateOne: async (request, response) => {
    try {
      const {
        requesterType,
        name,
        phone,
        birthdate,
        ahcccsId,
        pickup,
        destination,
        date,
        time,
        facilityLocation,
        patientsName,
      } = request.body;
      let updatedRideRequest = await TransportationRequestModel.findById(
        request.params.id
      );
      if (requesterType) updatedRideRequest.requesterType = requesterType;
      if (name) updatedRideRequest.name = name;
      if (phone) updatedRideRequest.phone = phone;
      if (birthdate) updatedRideRequest.birthdate = birthdate;
      if (ahcccsId) updatedRideRequest.ahcccsId = ahcccsId;
      if (pickup) updatedRideRequest.pickup = pickup;
      if (destination) updatedRideRequest.destination = destination;
      if (date && time)
        updatedRideRequest.requestDate = new Date(`${date}T${time}:00`);
      if (facilityLocation)
        updatedRideRequest.facilityLocation = facilityLocation;
      if (patientsName) updatedRideRequest.patientsName = patientsName;
      await TransportationRequestModel.bulkSave([updatedRideRequest]);
      return response.status(200).json({ data: updatedRideRequest });
    } catch (error) {
      return response
        .status(404)
        .json({ message: "can not find ride request", data: error });
    }
  },
  toggleActive: async (request, response) => {
    try {
      const rideRequest = await TransportationRequestModel.findById(
        request.params.id
      );
      rideRequest.isActive = !rideRequest.isActive;
      await TransportationRequestModel.bulkSave([rideRequest]);
      return response.status(200).json({ data: rideRequest });
    } catch (error) {
      return response
        .status(404)
        .json({ message: "can not find ride request", data: error });
    }
  },
  deleteOne: async (request, response) => {
    try {
      const rideRequest = await TransportationRequestModel.findByIdAndDelete(
        request.params.id
      );
      return response
        .status(200)
        .json({
          message: `removed entity ${rideRequest._id} successfully`,
          data: rideRequest,
        });
    } catch (error) {
      return response
        .status(404)
        .json({ message: "can not find ride request by id", data: error });
    }
  },
};
