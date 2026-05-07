const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "162.251.85.169", // your HostGator IP or localhost if backend is hosted on HostGator
  user: process.env.DB_USER || "dbuser",         // MySQL user from cPanel
  password: process.env.DB_PASSWORD || "your_password", // MySQL password
  database: process.env.DB_NAME || "dashboard_db",      // MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
});

pool.getConnection()
  .then(() => console.log("✅ MySQL connected"))
  .catch(err => console.error("❌ MySQL connection failed:", err));

module.exports = pool;
