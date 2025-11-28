// backend/controllers/authController.js
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GET /auth/exists
exports.checkAdminExists = async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    return res.json({ exists: count > 0 });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// POST /auth/register (ONLY if 0 admins)
exports.registerAdmin = async (req, res) => {
  try {
    const exists = await Admin.countDocuments();
    if (exists > 0) return res.status(403).json({ error: "Admin already exists" });

    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await Admin.create({ email, passwordHash });

    return res.json({
      message: "Admin registered",
      adminId: admin._id,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// POST /auth/login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    // IMPORTANT FIX → use JWT_SECRET instead of wrong ADMIN_JWT_SECRET
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: err.message });
  }
};
