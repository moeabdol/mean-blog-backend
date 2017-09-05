const express = require("express");
const users   = require("../controllers/users");
const router  = express.Router();

router.post("/users/register", users.register);
router.post("/users/login", users.login);
router.get("/users/checkemail/:email", users.checkEmail);
router.get("/users/checkusername/:username", users.checkUsername);
router.get("/users", users.checkAuthorized, users.show);

module.exports = router;
