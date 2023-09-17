const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const authentication = require("../auth");

router
  .route("/")
  .get(authentication, boardsController.getAllBoards)
  .post(authentication, boardsController.createNewBoard);

router
  .route("/:boardId")
  .get(authentication, boardsController.getBoardById)
  .patch(authentication, boardsController.updateBoard)
  .delete(authentication, boardsController.deleteBoard);

module.exports = router;
