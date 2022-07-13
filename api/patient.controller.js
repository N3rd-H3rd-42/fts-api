const PatientModel = require("../models/Patient");

module.exports = {
  createOne: async (request, response) => {
    const {
      firstName,
      lastName,
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
    const {
      id,
      firstName,
      lastName,
      ahcccsId,
      locationName,
      locationAddress1,
      locationAddress2,
      city,
      zipCode,
      phoneNumber,
      prefferedDriver,
    } = request.body;
    const targetPatient = await PatientModel.findById({ _id: id });
    if (!targetPatient) {
      return response.status(400).json({
        error: "error updating patient contant system admin",
      });
    } else {
      if (firstName) targetPatient.firstName = firstName;
      if (lastName) targetPatient.lastName = lastName;
      if (ahcccsId) targetPatient.ahcccsId = ahcccsId;
      if (locationName) targetPatient.locationName = locationName;
      if (locationAddress1) targetPatient.locationAddress1 = locationAddress1;
      if (locationAddress2) targetPatient.locationAddress1 = locationAddress2;
      if (city) targetPatient.city = city;
      if (zipCode) targetPatient.zipCode = zipCode;
      if (phoneNumber) targetPatient.phoneNumber = phoneNumber;
      if (prefferedDriver) targetPatient.prefferedDriver = prefferedDriver;
      await PatientModel.bulkSave([targetPatient]);
      const newPatientList = await PatientModel.find();
      return response.status(200).json({
        patientList: newPatientList,
      });
    }
  },
  toggleActive: async (request, response) => {
    const targetPatient = await PatientModel.findById({
      _id: request.params.patientId,
    });
    if (!targetPatient) {
      return response.status(400).json({ error: "can not find patient" });
    } else {
      const targetPatientCurrentStatus = targetPatient.isActive;
      targetPatient.isActive = !targetPatientCurrentStatus;
      await PatientModel.bulkSave([targetPatient]);
      const newPatientList = await PatientModel.find();
      return response.status(200).json({
        patientList: newPatientList,
      });
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
};
