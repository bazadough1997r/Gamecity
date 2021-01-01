const mongoose = require("mongoose");

const ChatSchema =  mongoose.Schema({
  message: {
    type: String,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProfileSchema'
  }, //By this we will have all the profileSchema
  type: { //chatt type
    type: String
  },
}, {timestamps: true});

const Chat = mongoose.model('Chat', ChatSchema)
module.exports = { Chat }
