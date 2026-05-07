const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

// ROUTES
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// --------------------
// DASHBOARD ROUTES
// --------------------
app.use("/api/dashboard", dashboardRoutes);

// --------------------
// SOCIAL POSTS ROUTE (Frontend uses this)
// --------------------
app.get("/api/social-posts", async (req, res) => {
  try {
    // 🔥 Delete posts older than 24 hours
    await pool.query(`
      DELETE FROM social_posts
      WHERE created_at < NOW() - INTERVAL 24 HOUR
    `);

    // ✅ Fetch remaining posts
    const [rows] = await pool.query(`
      SELECT 
        id,
        platform,
        caption,
        media_url,
        post_url,
        created_at
      FROM social_posts
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Social posts error:", err);
    res.status(500).json({ error: "Failed to fetch social posts" });
  }
});

// --------------------
// LATEST SOCIAL POST (For SocialNotification)
// --------------------
app.get("/api/latest-post", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM social_posts
      ORDER BY created_at DESC
      LIMIT 1
    `);

    res.json(rows[0] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch latest post" });
  }
});

// --------------------
// SERVER START
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
