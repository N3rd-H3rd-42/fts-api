const PatientModel = require("../models/Patient");

module.exports = {
  createOne: async (request, response) => {
    const patientList = PatientModel.find();
    const {
      firstName,
      lastName,
      ahcccsId,
      locationName,
      locationAdress,
      phoneNumber,
      prefferedDriver,
    } = request.body;
    if (
      !firstName ||
      !lastName ||
      !ahcccsId ||
      !locationName ||
      !locationAdress ||
      !phoneNumber ||
      !prefferedDriver
    ) {
      return response.render("dashboard", {
        user: request.user,
        error: "Error with request",
        patientList,
      });
    } else {
      const isPresent = await PatientModel.find({ ahcccsId });
      if (isPresent) {
        return response.render("dashboard", {
          user: request.user,
          error: "Patient already in system",
          patientList,
        });
      } else {
        const newPatient = await new PatientModel({
          firstName,
          lastName,
          ahcccsId,
          locationName,
          locationAdress,
          phoneNumber,
          prefferedDriver,
        });
        await PatientModel.bulkSave(newPatient);
        const newPatientList = await PatientModel.find();
        return response.render("dashboard", {
          user: request.user,
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
      locationAdress,
      phoneNumber,
      prefferedDriver,
    } = request.body;
    const targetPatient = await PatientModel.findById({ _id: id });
    if (!targetPatient) {
      const patientList = await PatientModel.find();
      return response.render("dashboard", {
        user: request.user,
        error: "error updating patient contant system admin",
        patientList,
      });
    } else {
      if (firstName) targetPatient.firstName = firstName;
      if (lastName) targetPatient.lastName = lastName;
      if (ahcccsId) targetPatient.ahcccsId = ahcccsId;
      if (locationName) targetPatient.locationName = locationName;
      if (locationAdress) targetPatient.locationAdress = locationAdress;
      if (phoneNumber) targetPatient.phoneNumber = phoneNumber;
      if (prefferedDriver) targetPatient.prefferedDriver = prefferedDriver;
      await PatientModel.bulkSave(targetPatient);
      const newPatientList = await PatientModel.find();
      return response.render("dashboard", {
        user: request.user,
        patientList: newPatientList,
      });
    }
  },
  toggleActive: async (request, response) => {
    const targetPatient = await PatientModel.findById({ _id: request.body.id });
    if (!targetPatient) {
      const patientList = await PatientModel.find();
      return response.render("dashboard", { user: request.user, patientList });
    } else {
      const targetPatientCurrentStatus = targetPatient.isActive;
      targetPatient.isActive = !targetPatientCurrentStatus;
      await PatientModel.bulkSave(targetPatient);
      const newPatientList = await PatientModel.find();
      return response.render("dashboard", {
        user: request.user,
        patientList: newPatientList,
      });
    }
  },
};
