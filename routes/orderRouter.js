const controller = require("../controllers/orderController.js");
const auth = require("../controllers/authController.js");

const { Router } = require("express");

const router = Router();

router.get("/me", auth.protect, auth.requiresRoles("depósito"), controller.getOrdersByCurrentDeposit);

router
  .route("/")
  .get(auth.protect, controller.getAvailableOrders)
  .post(
    auth.protect,
    auth.requiresRoles("administrador"),
    controller.createOrder
  );

router
  .route("/:id")
  .get(
    auth.protect,
    auth.requiresRoles("depósito", "administrador"),
    controller.getOrderById
  );

router
  .route("/done/:id")
  .put(
    auth.protect,
    auth.requiresRoles("administrador"),
    controller.completeOrderById
  );

router
  .route("/assign")
  .put(
    auth.protect,
    auth.requiresRoles("depósito", "administrador"),
    controller.assignOrderById
  );

router
  .route("/send/:id")
  .put(
    auth.protect,
    auth.requiresRoles("depósito", "administrador"),
    controller.sendOrderById
  );

module.exports = router;
