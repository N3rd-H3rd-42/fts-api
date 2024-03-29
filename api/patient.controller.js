const PatientModel = require("../models/Patient");

module.exports = {
  createOne: async (request, response) => {
    const {
      firstName,
      lastName,
      birthdate,
      ahcccsId,
      locationName,
      locationAddress1,
      locationAddress2,
      city,
      zipCode,
      phoneNumber,
      prefferedDriver,
    } = request.body;
    if (
      !firstName ||
      !lastName ||
      !ahcccsId ||
      !locationName ||
      !locationAddress1 ||
      !phoneNumber ||
      !prefferedDriver ||
      !city ||
      !zipCode
    ) {
      return response.status(400).json({ message: "all fields required" });
    } else {
      const isPresent = await PatientModel.findOne({ ahcccsId });
      console.log(isPresent);
      if (isPresent) {
        return response.status(400).json({
          error: "Patient already in system",
        });
      } else {
        const newPatient = await new PatientModel({
          firstName,
          lastName,
          birthdate,
          ahcccsId,
          locationName,
          locationAddress1,
          locationAddress2,
          city,
          zipCode,
          phoneNumber,
          prefferedDriver,
        });
        await PatientModel.bulkSave([newPatient]);
        const newPatientList = await PatientModel.find();
        return response.status(201).json({
          patientList: newPatientList,
        });
      }
    }
  },
  updateOne: async (request, response) => {
    const { patientId } = request.params;
    const {
      firstName,
      lastName,
      birthdate,
      ahcccsId,
      locationName,
      locationAddress1,
      locationAddress2,
      city,
      zipCode,
      phoneNumber,
      prefferedDriver,
    } = request.body;
    const targetPatient = await PatientModel.findById({ _id: patientId });
    if (!targetPatient) {
      return response.status(400).json({
        error: "error updating patient contant system admin",
      });
    } else {
      if (firstName) targetPatient.firstName = firstName;
      if (lastName) targetPatient.lastName = lastName;
      if (birthdate) targetPatient.birthdate = birthdate;
      if (ahcccsId) targetPatient.ahcccsId = ahcccsId;
      if (locationName) targetPatient.locationName = locationName;
      if (locationAddress1) targetPatient.locationAddress1 = locationAddress1;
      if (locationAddress2) targetPatient.locationAddress1 = locationAddress2;
      if (city) targetPatient.city = city;
      if (zipCode) targetPatient.zipCode = zipCode;
      if (phoneNumber) targetPatient.phoneNumber = phoneNumber;
      if (prefferedDriver) targetPatient.prefferedDriver = prefferedDriver;
      await PatientModel.bulkSave([targetPatient]);
      const updatedPatient = await PatientModel.findById({ _id: patientId });
      return response.status(200).json({
        data: updatedPatient,
      });
    }
  },
  toggleActive: async (request, response) => {
    try {
      const targetPatient = await PatientModel.findById({
        _id: request.params.patientId,
      });
      targetPatient.isActive = !targetPatient.isActive;
      await PatientModel.bulkSave([targetPatient]);
      return response.status(200).json({
        data: targetPatient,
      });
    } catch (error) {
      return response
        .status(404)
        .json({ message: "can not find patient", data: error });
    }
  },
  getAll: async (request, response) => {
    if (request.query?.isActive) {
      const isActiveQuery = request.query.isActive === "true";
      const patientList = (await PatientModel.find()).filter(
        (patient) => patient.isActive === isActiveQuery
      );
      console.log(patientList);
      return response.status(200).json({ patientList: patientList });
    } else {
      const patientList = await PatientModel.find();
      return response.status(200).json({ patientList: patientList });
    }
  },
  getPatientById: async (request, response) => {
    const { patientId } = request.params;
    const targetPatient = await PatientModel.findById({ _id: patientId });
    if (targetPatient) {
      return response.status(200).json({ data: targetPatient });
    } else {
      return response.status(404).json({ err: "patient not found" });
    }
  },
  deleteOne: async (request, response) => {
    try {
      const patient = await PatientModel.findByIdAndDelete(
        request.params.patientId
      );
      return response
        .status(200)
        .json({
          message: `removed entity ${patient._id} successfully`,
          data: patient,
        });
    } catch (error) {
      return response
        .status(404)
        .json({ message: "can not find patient by id", data: error });
    }
  },
};
