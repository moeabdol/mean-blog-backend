const Blog = require("../models/blog");
const jwt  = require("jsonwebtoken");

const create = (req, res) => {
  if (!req.body.title) return res.status(400).json({
    message: "Blog title is required"
  });

  if (!req.body.body) return res.status(400).json({
    message: "Blog body is required"
  });

  const newBlog = new Blog({
    title: req.body.title,
    body: req.body.body,
    createdBy: req.decoded.username
  });

  newBlog.save((err) => {
    if (err) {
      if (err.errors.email) {
        return res.status(400).json({ message: err.errors.title.message });
      } else if (err.errors.body) {
        return res.status(400).json({ message: err.errors.body.message });
      } else {
        return res.status(500).json({
          message: "Something went wrong!",
          error: err
        });
      }
    }
  });

  res.status(201).json({ blog: newBlog });
};

module.exports = {
  create
};
