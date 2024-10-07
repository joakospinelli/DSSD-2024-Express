const controller = require("../controllers/requestsController.js");

const { Router } = require("express");

const router = Router();

router.route("/")
    .get(controller.getAllRequests);

module.exports = router;