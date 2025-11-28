// backend/routes/introRoutes.js
const express = require("express");
const router = express.Router();

const { getIntro, updateIntro } = require("../controllers/introController");
const { verifyAdmin } = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", getIntro);

// ADMIN ONLY
router.put("/", verifyAdmin, updateIntro);

module.exports = router;
  