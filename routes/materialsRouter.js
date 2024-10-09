const { Router } = require("express");
const auth = require("../controllers/authController.js");
const controller = require("../controllers/materialController.js");

const router = Router();

router.route("/")
    .get(controller.getAllMaterials)
    .post(auth.protect, auth.requiresRoles("administrador"), controller.createMaterial);

module.exports = router;