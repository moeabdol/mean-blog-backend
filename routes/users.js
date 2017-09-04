const express = require("express");
const users   = require("../controllers/users");
const router  = express.Router();

router.post("/users/register", users.register);

module.exports = router;
