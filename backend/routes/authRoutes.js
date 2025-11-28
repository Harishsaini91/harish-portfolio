// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  checkAdminExists,
} = require("../controllers/authController");

// check if any admin exists
router.get("/exists", checkAdminExists);

// register (only when no admin)
router.post("/register", registerAdmin);

// login
router.post("/login", loginAdmin);

module.exports = router;
