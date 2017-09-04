const express = require("express");
const users   = require("../controllers/users");
const router  = express.Router();

router.post("/users/register", users.register);
router.get("/users/checkemail/:email", users.checkEmail);
router.get("/users/checkusername/:username", users.checkUsername);

module.exports = router;
