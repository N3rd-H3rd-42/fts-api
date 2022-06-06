const router = require("express").Router();
const patientController = require('./patient.controller');

router
  .route("/patient")
  .post(patientController.createOne)

router
  .route("/patient/:patientId")
  .put(patientController.updateOne);

router.route('/patients').get(patientController.getAll);

router.route("/patient/toggle-active").put(patientController.toggleActive);

module.exports = router;
