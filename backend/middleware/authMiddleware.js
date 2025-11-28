// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

/**
 * verifyAdmin
 * Middleware that checks if the request contains a valid JWT token.
 * Used for all admin-protected routes:
 *  - Create Project
 *  - Update Project
 *  - Delete Project
 *  - Update Intro
 *  - Upload (Cloudinary / Local)
 */

exports.verifyAdmin = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ error: "No authorization token provided" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Malformed authorization header" });
    }

    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // attach admin data to request
    req.adminId = decoded.id; 
    req.adminEmail = decoded.email;

    next();
  } catch (err) {
    console.error("Auth verification error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
