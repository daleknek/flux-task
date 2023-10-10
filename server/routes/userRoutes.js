const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authentication = require("../middleware/authentication");

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser);

router
  .route("/:userId")
  .get(authentication, usersController.getUserById)
  .patch(authentication, usersController.updateUser)
  .delete(authentication, usersController.deleteUser);

module.exports = router;
