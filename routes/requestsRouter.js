const controller = require("../controllers/requestsController.js");
const auth = require("../controllers/authController.js");

const { Router } = require("express");

const router = Router();

router
  .route("/")
  .get(auth.protect, auth.requiresRoles("depósito"), controller.getAllRequests);

module.exports = router;
