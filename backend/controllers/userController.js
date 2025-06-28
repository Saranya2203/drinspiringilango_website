const pool = require('../config');

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, name, email, role FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM bookings');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM inquiries');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
