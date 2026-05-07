const db = require("../config/db");

const cleanupOldPosts = async () => {
  await db.execute(
    `DELETE FROM social_posts
     WHERE created_at < NOW() - INTERVAL 24 HOUR`
  );
  console.log("🧹 Old social posts cleaned");
};

module.exports = cleanupOldPosts;
