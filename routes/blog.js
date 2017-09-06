const express = require("express");
const blogs   = require("../controllers/blogs");
const users   = require("../controllers/users");
const router  = express.Router();

router.post("/blog", users.checkAuthorized, blogs.create);

module.exports = router;
