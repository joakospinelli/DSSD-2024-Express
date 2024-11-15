const { Router } = require("express");
const auth = require("../controllers/authController.js");
const controller = require("../controllers/materialController.js");

const router = Router();

router.route("/")
    .get(controller.getAllMaterials)
    .post(auth.protect, auth.requiresRoles("administrador"), controller.createMaterial);
router.get("/:id/deposits", auth.protect, auth.requiresRoles("administrador"), controller.getFeaturedDepositsByMaterial);

module.exports = router;