const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  city: String,
  phoneNo: Number,
  birthday: Date,
  password: String,
  url:String

});

module.exports = mongoose.model("ProfileSchema", ProfileSchema);
