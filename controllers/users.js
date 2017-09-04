const User = require("../models/user");

const register = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      message: "Email must be provided!"
    });
  }
  if (!req.body.username) {
    return res.status(400).json({
      message: "Username must be provided!"
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      message: "Password must be provided!"
    });
  }

  let newUser = new User({
    email:    req.body.email.toLowerCase(),
    username: req.body.username.toLowerCase(),
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      if (err.code === 11000) return res.status(400).json({
        message: "Username or email already exists!"
      });

      if (err.errors) {
        if (err.errors.email) {
          if (err.errors.email.value === "") return res.status(400).json({
            message: "Email must not be empty spaces!"
          });
          if (err.errors.email.message ===
            "Email is not a valid email address!") {
            return res.status(400).json({
              message: err.errors.email.message
            });
          }
        }

        if (err.errors.username) {
          if (err.errors.username.value === "") return res.status(400).json({
            message: "Username must not be empty spaces!"
          });
          if (err.errors.username.kind === "minlength") {
            return res.status(400).json({
              message: "Username must be at least (3) characters long!"
            });
          }
          if (err.errors.username.kind === "maxlength") {
            return res.status(400).json({
              message: "Username must be at most (15) characters long!"
            });
          }
        }

        if (err.errors.password) {
          if (err.errors.password.kind === "minlength") {
            return res.status(400).json({
              message: "Password must be at least (8) characters long!"
            });
          }
        }
      }

      return res.status(500).json({
        message: "Internal server error.",
        error: err
      });
    }

    res.status(201).json({
      message: "User created successfully."
    });
  });
};

module.exports = {
  register
};
