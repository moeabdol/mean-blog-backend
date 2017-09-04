const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  email:    { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
});

UserSchema.index({ email: 1, username: 1}, { unique: true });

module.exports = mongoose.model("User", UserSchema);
