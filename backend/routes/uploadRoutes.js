// backend/routes/uploadRoutes.js
const express = require("express");
const router = express.Router();

const {
  uploadLocal,
  uploadCloud,
} = require("../controllers/uploadController");

const { verifyAdmin } = require("../middleware/authMiddleware");
const multer = require("multer");

// Local storage config (fallback)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads_media/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "")),
});

const upload = multer({ storage });

// LOCAL UPLOAD (optional)
router.post("/local", verifyAdmin, upload.single("file"), uploadLocal);

// CLOUDINARY UPLOAD (recommended)
router.post("/upload-cloud", verifyAdmin, upload.single("file"), uploadCloud);

module.exports = router;
