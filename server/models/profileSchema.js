const mongoose= require('mongoose');

const profileSchema = mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  city: String,
  phoneNo: Number,
  birthday: Date,
  //changed password type to string because of server error
  password: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  joinCount: {
    type: Number,
    id: [Number],
    default: 0,
  }
  
});

const User = mongoose.model('User', profileSchema);

module.exports = User;
