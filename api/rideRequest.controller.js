const TransportationRequestModel = require("../models/TransportationRequest");

module.exports = {
    getAll: async (request, response) => {
        try {
            const rideRequests = await TransportationRequestModel.find();
            return response.status(200).json({ data: rideRequests })
        } catch (error) {
            console.log(error);
            return response.status(500).json({ data: error })
        }
    }
}