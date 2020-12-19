import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
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

const ProfileSchema = mongoose.model('ProfileSchema', profileSchema);

export default ProfileSchema;
