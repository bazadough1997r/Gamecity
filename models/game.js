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
  // image: {
  //   type: null,
  //   required: [true, "Please upload image of game"]
  // }
});

module.exports = mongoose.model("Game", gameSchema);

/*
this is the old schema
I'll add the rest of the old schema when i finish the essence

const gameSchema = mongoose.Schema({

  post: String,
  game: String,
  duration: String,
  date: Date,
  location: String,
  image: String,
  likeCount: {
      type: Number,
      default: 0
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },

});

const GameSchema = mongoose.model('GameSchema', gameSchema);

export default GameSchema;
*/
