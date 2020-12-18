const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: [true, "game name is required"],
  },
  content: {
    type: String,
    required: [true, "Content can't be blank"],
  },
});

module.exports = mongoose.model("Game", gameSchema);
