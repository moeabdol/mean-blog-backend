const mongoose    = require("mongoose");
const bcrypt      = require("bcryptjs");
const Schema      = mongoose.Schema;
const SALT_FACTOR = 10;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (email) => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      }, message: "Email is not a valid email address!"
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 15
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

UserSchema.pre("save", function(next) {
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return done(err);
    done(null, isMatch);
  });
};

UserSchema.index({ email: 1, username: 1}, { unique: true });

module.exports = mongoose.model("User", UserSchema);
