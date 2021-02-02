const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: [true, "Game name is required"],
  },
  gameType: {
    type: String,
    required: [true, "Game type is required"],
  },
  gameDuration: {
    type: String,
    required: [true, "Game duration is required"],
  },
  gameGovernorate: {
    type: String,
    required: [true, "Game governorate is required"],
  },
  gameDate: {
    type: String,
    required: [true, "Game governorate is required"],
  },

  likeCount: [Object],
  unlikeCount: {
    type: Number,
    default: 0,
  },
  joins: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  joinCount: [Object],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comment: [Object],
  selectedFile: {
    required: [true, "Game duration is required"],
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
});

module.exports = mongoose.model("Game", gameSchema);
