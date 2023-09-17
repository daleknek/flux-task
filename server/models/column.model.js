const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const columnSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    wip: {
      type: Number,
      default: 0,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Column = mongoose.model("Column", columnSchema);
module.exports = Column;
