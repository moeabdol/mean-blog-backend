const express = require("express");
const blogs   = require("../controllers/blogs");
const users   = require("../controllers/users");
const router  = express.Router();

router.get("/blog", users.checkAuthorized, blogs.index);
router.get("/blog/:id", users.checkAuthorized, blogs.show);
router.post("/blog", users.checkAuthorized, blogs.create);

module.exports = router;
