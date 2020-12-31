const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  city: { type: String },
  phoneNo: { type: Number },
  birthday: { type: Date },
  password: { type: String },
});

module.exports = mongoose.model("ProfileSchema", ProfileSchema);
