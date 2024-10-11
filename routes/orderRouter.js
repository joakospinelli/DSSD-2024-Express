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

router.route("/done/:id").put(auth.protect, controller.completeOrderById);

router.route("/assign").put(auth.protect, controller.assignOrderById);

router.route("/send/:id").put(auth.protect, controller.sendOrderById);

module.exports = router;
