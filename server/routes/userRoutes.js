const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authentication = require("../auth");

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser);

router
  .route("/:userId")
  .get(authentication, usersController.getUserById)
  .patch(authentication, usersController.updateUser)
  .delete(authentication, usersController.deleteUser);

router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn);

module.exports = router;
