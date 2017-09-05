const jwt    = require("jsonwebtoken");
const User   = require("../models/user");
const config = require("../config/config");

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

const login = (req, res) => {
  if (!req.body.username) return res.status(400).json({
    message: "Username must be provided!"
  });

  if (!req.body.password) return res.status(400).json({
    message: "Password must be provided!"
  });

  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) return res.status(500).json({
      message: "Something went wrong!",
      error: err
    });

    if (!user) return res.status(400).json({
      message: "User not found!"
    });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).json({
        message: "Something went wrong!",
        error: err
      });

      if (!isMatch) return res.status(403).json({
        message: "Wrong password!"
      });

      const token = jwt.sign({ userId: user._id }, config.secret, {
        expiresIn: "7d"
      });

      res.status(200).json({
        token: token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        },
        message: "Successful login."
      });
    });
  });
};

const checkEmail = (req, res) => {
  if (!req.params.email) return res.status(400).json({
    message: "Email was not provided!"
  });

  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) return res.status(500).json({
      message: "Something went wrong!",
      error: err
    });

    if (user) {
      res.status(200).json({ found: true, message: "Email already taken!" });
    } else {
      res.status(200).json({ found: false, message: "Email is available." });
    }
  });
};

const checkUsername = (req, res) => {
  if (!req.params.username) return res.status(400).json({
    message: "Username was not provided!"
  });

  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) return res.status(500).json({
      message: "Something went wrong!",
      error: err
    });

    if (user) {
      res.status(200).json({
        found: true,
        message: "Username already taken!"
      });
    } else {
      res.status(200).json({
        found: false,
        message: "Username is available."
      });
    }
  });
};

const show = (req, res) => {
  User.findById(req.decoded.userId, (err, user) => {
    if (err) return res.status(500).json({
      message: "Something went wrong!",
      error: err
    });

    if (!user) return res.status(400).json({
      message: "User not found!"
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  });
};

const checkAuthorized = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({
    message: "No token provided!"
  });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(403).json({
      message: "Invalid token!",
      error: err
    });
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  register,
  login,
  checkEmail,
  checkUsername,
  show,
  checkAuthorized
};
