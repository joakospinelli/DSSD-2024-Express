const controller = require("../controllers/requestsController.js");
const auth = require("../controllers/authController.js");

const { Router } = require("express");

const router = Router();
const meRouter = Router();

router
  .route("/")
  .get(auth.protect, auth.requiresRoles("depósito"), controller.getAllRequests);

meRouter
  .route("/")
  .get(auth.protect, auth.requiresRoles("recolector"), controller.getRequestsByCurrentUser);

meRouter
  .get("/pending", auth.protect, auth.requiresRoles("recolector"), controller.currentUserHasPending);

router.use("/me", meRouter);

module.exports = router;
