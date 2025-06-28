const pool = require('../config');
const { uploadToSocialMedia } = require('../utils/socialSync');

exports.uploadContent = async (req, res) => {
  const { title, content, mediaType } = req.body;
  const filePath = req.file ? req.file.path : null;

  try {
    const [result] = await pool.execute(
      'INSERT INTO contents (title, content, media_type, media_path, uploaded_by) VALUES (?, ?, ?, ?, ?)',
      [title, content, mediaType, filePath, req.user.id]
    );

    // Start social media sync (async)
    uploadToSocialMedia({ title, content, mediaType, filePath });

    res.status(201).json({ message: 'Content uploaded and syncing started' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
