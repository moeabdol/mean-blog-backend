const Blog = require("../models/blog");

const index = (req, res) => {
  Blog.find({}, (err, blogPosts) => {
    if (err) return res.status(500).json({
      message: "Something went wrong!",
      error: err
    });

    if (!blogPosts) return res.status(404).json({
      message: "Blog posts not found!"
    });

    res.status(200).json(blogPosts);
  }).sort({ _id: -1 });
};

const show = (req, res) => {
  Blog.findOne({ _id: req.params.id }, (err, blogPost) => {
    if (err) return res.status(404).json({
      message: "Blog post not found!",
      error: err
    });

    if (!blogPost) return res.status(404).json({
      message: "Blog post not found!"
    });

    res.status(200).json(blogPost);
  });
};

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

  res.status(201).json({ message: "Blog post created successfully." });
};

module.exports = {
  index,
  show,
  create
};
