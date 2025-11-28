// backend/upload/multerConfig.js

const multer = require("multer");
const path = require("path");

// Sanitize filename
function cleanFileName(original) {
  return original.replace(/\s+/g, "_").replace(/[^A-Za-z0-9._-]/g, "");
}

// Multer disk storage (local fallback)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const safe = cleanFileName(file.originalname);
    const filename = Date.now() + "-" + safe;
    cb(null, filename);
  },
});

// Basic file filter (accept only images & videos)
function fileFilter(req, file, cb) {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("video")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files allowed"), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 300, // 300MB max
  },
});

module.exports = upload;
module.exports.storage = storage;
module.exports.fileFilter = fileFilter;
