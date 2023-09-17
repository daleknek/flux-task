const Board = require("../models/board.model");

const boardsController = {};

// Get all boards of a user
boardsController.getAllBoards = async (req, res) => {
  try {
    const userId = req.user.id;
    const boards = await Board.find({ user_id: userId });
    res.status(200).json(boards);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch boards" });
  }
};

// Get a specific board by ID
boardsController.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch board" });
  }
};

// Create a new board for a user
boardsController.createNewBoard = async (req, res) => {
  try {
    const board = new Board(req.body);
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    console.error("Error when creating board:", error.message);
    res
      .status(400)
      .json({ error: "Failed to create board", details: error.message });
  }
};

// Update a board by ID
boardsController.updateBoard = async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.boardId,
      req.body,
      { new: true }
    );
    if (!updatedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(400).json({ error: "Failed to update board" });
  }
};

// Delete a board by ID
boardsController.deleteBoard = async (req, res) => {
  try {
    const deletedBoard = await Board.findByIdAndDelete(req.params.boardId);
    if (!deletedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete board" });
  }
};

module.exports = boardsController;
