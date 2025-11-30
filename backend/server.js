// ================================================
// SERVER.JS — MAIN BACKEND ENTRY FILE
// ================================================

require("dotenv").config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

// -------------------------------
// INIT APP
// -------------------------------
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors()); 

// -------------------------------
// STATIC UPLOADS (local fallback)
// -------------------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------------------
// DB CONNECTION
// -------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// -------------------------------
// ROUTES IMPORT
// -------------------------------
const authRoutes = require("./routes/authRoutes");
const introRoutes = require("./routes/introRoutes");
const projectRoutes = require("./routes/projectRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// -------------------------------
// ROUTES USE 
// -------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/intro", introRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/upload", uploadRoutes);

// -------------------------------
// HEALTH CHECK
// -------------------------------
app.get("/", (req, res) => {
  res.send("Portfolio API Running...");
});

// -------------------------------
// GLOBAL ERROR HANDLER
// -------------------------------
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// -------------------------------
// START SERVER
// -------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
