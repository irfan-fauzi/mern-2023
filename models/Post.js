/* eslint-disable linebreak-style */
import mongoose from 'mongoose';

const { Schema } = mongoose;
const PostSchema = new Schema({
  id: String,
  userId: String,
  firstName: {
    type: String,
    min: 2,
    max: 50,
    required: true,
  },
  lastName: {
    type: String,
    min: 2,
    max: 50,
    required: true,
  },
  location: String,
  description: {
    type: String,
    max: 500,
  },
  userPicturePath: {
    type: String,
    default: '',
  },
  picturePath: {
    type: String,
    default: '',
  },
  likes: {
    type: Object,
    default: {},
  },
  comments: {
    type: Array,
    default: [],
  },
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
