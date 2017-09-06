const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    validate: {
      validator: (title) => {
        return /^[a-zA-Z0-9 ]+$/.test(title);
      }, message: "Title must be alpha-numeric!"
    }
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: Array
  },
  dislikes: {
    type: Number,
    default: 0
  },
  dislikedBy: {
    type: Array
  },
  comments: [
    {
      comment: {
        type: String,
        minlength: 1,
        maxlength: 200
      },
      commentator: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model("Blog", BlogSchema);
