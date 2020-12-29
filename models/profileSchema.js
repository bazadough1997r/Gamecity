const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  city: {type: String},
  phoneNo: {type: Number},
  birthday: {type: Date}, 
  password: {type: String}
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
