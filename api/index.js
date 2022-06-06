const router = require("express").Router();
const patientController = require('./patient.controller');

router
  .route("/patient")
  .post(patientController.createOne)
  .put(patientController.updateOne);

router.route("/patient/toggle-active").put(patientController.toggleActive);

module.exports = router;
