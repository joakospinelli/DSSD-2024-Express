const { Router } = require("express");
const controller = require("../controllers/usersController.js");
const auth = require("../controllers/authController.js");

const router = Router();

router.post("/login", auth.login);

router.route("/")
    .get(controller.getAllUsers)
    .post(controller.createUser);

router.route("/:id")
    .get(controller.getUserById)
    .put(controller.updateUserById)
    .delete(controller.deleteUserById);

module.exports = router;