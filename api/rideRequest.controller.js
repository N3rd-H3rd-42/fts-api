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
        
    } catch (error) {
        return response.status(500).json({ message: `error processing request`, data: error })
    }
  }
};
