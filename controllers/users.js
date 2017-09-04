const User = require("../models/user");

const register = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      message: "Email not provided!"
    });
  }
  if (!req.body.username) {
    return res.status(400).json({
      message: "Username not provided!"
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      message: "Password not provided!"
    });
  }

  let newUser = new User({
    email:    req.body.email.toLowerCase(),
    username: req.body.username.toLowerCase(),
    password: req.body.password
  });
  newUser.save((err) => {
    if (err) return res.status(500).json({
      message: "Could not create user.",
      error: err
    });

    res.status(201).json({
      message: "User created successfully."
    });
  });
};

module.exports = {
  register
};
