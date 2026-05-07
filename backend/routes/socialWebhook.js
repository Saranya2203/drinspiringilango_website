const express = require("express");
const router = express.Router();
const pool = require("../config/db");


const VERIFY_TOKEN = "myclientwebhook123";


router.get("/", (req, res) => {
const mode = req.query["hub.mode"];
const token = req.query["hub.verify_token"];
const challenge = req.query["hub.challenge"];


if (mode === "subscribe" && token === VERIFY_TOKEN) {
return res.status(200).send(challenge);
}
res.sendStatus(403);
});


router.post("/", async (req, res) => {
try {
const body = req.body;


if (body.object === "instagram") {
const entry = body.entry?.[0];
const mediaId = entry?.changes?.[0]?.value?.media_id;


if (mediaId) {
await pool.query(
`INSERT INTO social_posts(platform, caption, post_url)
VALUES($1,$2,$3)`,
["instagram", "New Instagram Post", `https://www.instagram.com/p/${mediaId}/`]
);
}
}


if (body.object === "page") {
const entry = body.entry?.[0];
const postId = entry?.changes?.[0]?.value?.post_id;


if (postId) {
await pool.query(
`INSERT INTO social_posts(platform, caption, post_url)
VALUES($1,$2,$3)`,
["facebook", "New Facebook Post", `https://www.facebook.com/${postId}`]
);
}
}


res.sendStatus(200);
} catch (err) {
console.error(err);
res.sendStatus(500);
}
});


module.exports = router;