const router = require("express").Router();
const patientController = require("./patient.controller");
const emailController = require('./email.controller');
const authController = require('./auth.controller');

router
  .route("/patient")
  .post(patientController.createOne)
  .put(patientController.updateOne);

router.route("/patients").get(patientController.getAll);

router
  .route("/patient/toggle-active/:patientId")
  .put(patientController.toggleActive);

router.route('/send-email').post(emailController.sendEmailNotification);

router.route('/login').post(authController.login);

module.exports = router;
