// backend/upload/detectFileType.js

const mime = require("mime-types");

/**
 * detectFileType(file)
 * Returns: "image" | "video"
 */
function detectFileType(file) {
  if (!file) return "image";

  const mimeType = file.mimetype || mime.lookup(file.originalname);

  if (mimeType && mimeType.startsWith("video")) {
    return "video";
  }

  return "image";
}

module.exports = detectFileType;
