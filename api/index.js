const router = require("express").Router();
const patientController = require("./patient.controller");
const emailController = require("./email.controller");
const authController = require("./auth.controller");
const smsController = require("./sms.controller");
const rideRequestController = require('./rideRequest.controller');

router.route("/patient").post(patientController.createOne);

router
  .route("/patient/:patientId")
  .get(patientController.getPatientById)
  .put(patientController.updateOne);

router.route("/patients").get(patientController.getAll);

router
  .route("/patient/toggle-active/:patientId")
  .put(patientController.toggleActive);

router.route("/send-email").post(emailController.sendEmailNotification);

router.route("/login").post(authController.login);

router.route("/request-a-ride").post(smsController.sendRideRequest);

router.route('/ride-requests').get(rideRequestController.getAll);

router.route("/ride-requests").post(rideController.createOne);

router
  .route("/ride-requests/:rideId")
  .get(patientController.getPatientById)
  .put(patientController.updateOne);

// Need to apply ride pending / ride completed toggle
router
  .route("/ride-requests/toggle-active/:rideId")
  .put(rideController.toggleActive);

module.exports = router;
