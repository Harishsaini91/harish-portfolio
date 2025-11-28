// backend/controllers/uploadController.js
const cloudinary = require("../utils/cloudinary");
const mime = require("mime-types");

exports.uploadLocal = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file provided" });

    const type = file.mimetype.startsWith("video") ? "video" : "image";

    res.json({
      url: "/uploads/" + file.filename,
      type,
    });
  } catch (err) {
    console.error("Local upload error:", err);
    res.status(500).json({ error: err.message });
  }
};

const fs = require("fs");

exports.uploadCloud = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const filePath = req.file.path;
    const isVideo = req.file.mimetype.startsWith("video");
    const resourceType = isVideo ? "video" : "image";

    const uploaded = await cloudinary.uploader.upload(filePath, {
      folder: "portfolio_uploads",
      resource_type: resourceType,
    });

    // delete temp file after upload
    fs.unlink(filePath, () => {});

    return res.json({
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
      type: resourceType,
    });

  } catch (err) {
    console.error("Cloud upload error:", err);
    return res.status(500).json({ error: "Cloud upload failed", details: err.message });
  }
};


