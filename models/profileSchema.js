const mongoose = require("mongoose");

const ProfileSchema= new mongoose.Schema({

  firstName: String,
  lastName: String,
  username: String,
  email: String,
  city: String,
  phoneNo: Number,
  birthday: Date,
  password: String
  // likeCount: {
  //   type: Number,
  //   default: 0,
  // },
  // createdAt: {
  //   type: Date,
  //   default: new Date(),
  // },
  // joinCount: {
  //   type: Number,
  //   id: [Number],
  //   default: 0,
  // }
  
});

module.exports = mongoose.model("ProfileSchema", ProfileSchema);
