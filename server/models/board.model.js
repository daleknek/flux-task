const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;