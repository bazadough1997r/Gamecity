import mongoose from "mongoose";

const postSchema = mongoose.Schema({

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

const PostSchema = mongoose.model('PostSchema', postSchema);

export default PostSchema;