import mongoose from "mongoose";

const postSchema = mongoose.Schema({

  Post: String,
  Game: String,
  Duration: String,
  Date: Date,
  Location: String,
  Image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },

});

const PostSchema = mongoose.model('PostSchema', postSchema);

export default PostSchema;