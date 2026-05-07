const pool = require("../config/db");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

// TEMP storage for multer (file kept in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });
module.exports.upload = upload;

// =============================
//       HELPERS
// =============================
const safeParse = (val) => {
  if (!val) return [];
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }
  if (typeof val === "object") return val;
  return [];
};

const toJson = (val) => {
  if (!val) return "[]";
  if (typeof val === "string") return val;
  return JSON.stringify(val);
};

// =============================
//     CLOUDINARY UPLOAD
// =============================
module.exports.uploadToCloudinary = [
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file uploaded" });

      const uploadResult = cloudinary.uploader.upload_stream(
        { folder: "dashboard_uploads", resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ message: "Upload failed" });
          }
          return res.status(200).json({ url: result.secure_url, public_id: result.public_id });
        }
      );

      uploadResult.end(req.file.buffer);
    } catch (err) {
      console.error("Upload Error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

// =============================
//      GET DASHBOARD
// =============================
module.exports.getDashboard = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM dashboard LIMIT 1");
    const row = rows[0] || {};

    res.json({
      ...row,
      blogs: safeParse(row.blogs),
      gallery: safeParse(row.gallery),
      testimonials: safeParse(row.testimonials),
      materials: safeParse(row.materials),
      brochures: safeParse(row.brochures),
      batchPassword: row.batchPassword || "",
      passwordExpiry: row.passwordExpiry || "",
    });
  } catch (err) {
    console.error("Get Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
//     UPDATE DASHBOARD
// =============================
module.exports.updateDashboard = async (req, res) => {
  try {
    const { blogs, gallery, testimonials, materials, brochures, batchPassword, passwordExpiry } = req.body;

    await pool.query(
      `UPDATE dashboard 
       SET blogs=?, gallery=?, testimonials=?, materials=?, brochures=?, batchPassword=?, passwordExpiry=?, lastUpdated=NOW()
       WHERE id=1`,
      [toJson(blogs), toJson(gallery), toJson(testimonials), toJson(materials), toJson(brochures), batchPassword || "", passwordExpiry || null]
    );

    const [rows] = await pool.query("SELECT * FROM dashboard LIMIT 1");
    const updated = rows[0] || {};

    res.json({
      ...updated,
      blogs: safeParse(updated.blogs),
      gallery: safeParse(updated.gallery),
      testimonials: safeParse(updated.testimonials),
      materials: safeParse(updated.materials),
      brochures: safeParse(updated.brochures),
      batchPassword: updated.batchPassword || "",
      passwordExpiry: updated.passwordExpiry || "",
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};
