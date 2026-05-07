const db = require("../config/db");
const axios = require("axios");

// 🔹 Fetch Instagram posts and store
const fetchInstagramPosts = async () => {
  const url = `https://graph.instagram.com/${process.env.INSTAGRAM_USER_ID}/media`;
  const params = {
    fields: "id,caption,media_url,permalink,timestamp",
    access_token: process.env.INSTAGRAM_ACCESS_TOKEN
  };

  const { data } = await axios.get(url, { params });

  for (const post of data.data) {
    await db.execute(
      `INSERT IGNORE INTO social_posts 
       (platform, post_id, caption, media_url, post_url, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        "instagram",
        post.id,
        post.caption || "",
        post.media_url,
        post.permalink,
        new Date(post.timestamp)
      ]
    );
  }
};

// 🔹 Fetch Facebook posts and store
const fetchFacebookPosts = async () => {
  const url = `https://graph.facebook.com/${process.env.FACEBOOK_PAGE_ID}/posts`;
  const params = {
    fields: "id,message,created_time,permalink_url",
    access_token: process.env.FACEBOOK_ACCESS_TOKEN
  };

  const { data } = await axios.get(url, { params });

  for (const post of data.data) {
    await db.execute(
      `INSERT IGNORE INTO social_posts
       (platform, post_id, caption, post_url, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [
        "facebook",
        post.id,
        post.message || "",
        post.permalink_url,
        new Date(post.created_time)
      ]
    );
  }
};

// 🔹 API: Send last 24h posts to frontend
exports.getSocialPosts = async (req, res) => {
  try {
    await fetchInstagramPosts();
    await fetchFacebookPosts();

    const [rows] = await db.execute(
      `SELECT * FROM social_posts
       WHERE created_at >= NOW() - INTERVAL 24 HOUR
       ORDER BY created_at DESC`
    );

    res.json(rows);
  } catch (err) {
    console.error("Social fetch error:", err.message);
    res.status(500).json({ error: "Failed to load social posts" });
  }
};
