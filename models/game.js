const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: [true, "Game name is required"]
  },
  gameType: {
    type: String,
    required: [true, "Game type is required"]
  },
  gameDuration: {
    type: String,
    required: [true, "Game duration is required"]
  },
  gameGovernorate: {
    type: String,
    required: [true, "Game governorate is required"]
  },
  gameDate: {
    type: String,
    required: [true, "Game governorate is required"]
  },
  like: {
    type: Number,
    default: 0
  },
  comment : {
    type: String
  },
  selectedFile: {
    type: String,
    required: [true, "Please upload image of game"]
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("Game", gameSchema);

