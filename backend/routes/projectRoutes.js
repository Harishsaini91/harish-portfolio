// backend/routes/projectRoutes.js
const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProjectById,
  getByCategory,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const { verifyAdmin } = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", getAllProjects);
router.get("/category/:category", getByCategory);
router.get("/:id", getProjectById);

// ADMIN
router.post("/", verifyAdmin, createProject);
router.put("/:id", verifyAdmin, updateProject);
router.delete("/:id", verifyAdmin, deleteProject);

module.exports = router;
