const express = require("express");
const router = express.Router();
const { getSocialPosts } = require("../controllers/social.controller");

router.get("/social-posts", getSocialPosts);

module.exports = router;
