const { Router } = require("express");
const controller = require("../controllers/depositsController.js");
const auth = require("../controllers/authController.js");

const router = Router();

router.route("/")
    .get(auth.protect, controller.getAllDeposits)
    .post(auth.protect, auth.requiresRoles("administrador"), controller.createDeposit);

router.route("/:id")
    .get(auth.protect, controller.getDepositById);

module.exports = router;