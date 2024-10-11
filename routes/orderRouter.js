const controller = require("../controllers/orderController.js");
const auth = require("../controllers/authController.js");

const { Router } = require("express");

const router = Router();

router
  .route("/")
  .get(auth.protect, controller.getAvailableOrders)
  .post(
    auth.protect,
    auth.requiresRoles("administrador"),
    controller.createOrder
  );

router.route("/:id").get(auth.protect, controller.getOrderById);

router.route("/done/:id").get(auth.protect, controller.completeOrderById);

router.route("/assign/:id").get(auth.protect, controller.assignOrderById);

module.exports = router;
