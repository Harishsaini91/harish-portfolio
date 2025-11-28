// backend/seed/seed.js

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");
const Intro = require("../models/Intro");
const Project = require("../models/Project");

// -----------------------------
// CONNECT DB
// -----------------------------
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🌱 DB Connected for Seeding"))
  .catch((err) => console.error(err));

(async function seed() {
  try {
    console.log("\n=============================");
    console.log("🌱 STARTING SEED PROCESS");
    console.log("=============================\n");

    // --------------------------------
    // SEED ADMIN (ONLY IF NONE EXISTS)
    // --------------------------------
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const passwordHash = await bcrypt.hash("admin123", 12);

      await Admin.create({
        email: "admin@example.com",
        passwordHash,
      });

      console.log("✔ Admin created:");
      console.log("Email: admin@example.com");
      console.log("Password: admin123\n");
    } else {
      console.log("✔ Admin already exists — skipping\n");
    }

    // --------------------------------
    // SEED INTRO (ONLY IF NONE EXISTS)
    // --------------------------------
    const introExists = await Intro.findOne();

    if (!introExists) {
      await Intro.create({
        name: "Harish Saini",
        bioLines: [
          "Full Stack Developer",
          "Creative UI/UX Enthusiast",
          "Turning Ideas Into Experiences",
        ],
        bioTypingEffect: true,

        description:
          "Welcome to my portfolio — a space where creativity meets logic and every project tells a story.",

        profileImage: {
          url: "https://res.cloudinary.com/demo/image/upload/v1690000000/default_profile.jpg",
          public_id: "demo_default_profile",
          type: "image",
        },

        backgroundMedia: {
          url: "https://res.cloudinary.com/demo/video/upload/v1690000000/default_bg.mp4",
          public_id: "demo_bg_video",
          type: "video",
        },

        backgroundFallback: {
          url: "https://res.cloudinary.com/demo/image/upload/v1690000000/default_bg.jpg",
          public_id: "demo_bg_image",
          type: "image",
        },

        links: [
          { label: "GitHub", url: "https://github.com/" },
          { label: "LinkedIn", url: "https://linkedin.com/" },
          { label: "Instagram", url: "https://instagram.com/" },
          { label: "Twitter", url: "https://twitter.com/" },
          { label: "Resume", url: "https://example.com/resume.pdf" },
        ],

        resumeUrl: "https://example.com/resume.pdf",
        contactEmail: "yourmail@example.com",

        overlayOpacity: 0.35,
      });

      console.log("✔ Intro section created\n");
    } else {
      console.log("✔ Intro already exists — skipping\n");
    }

    // --------------------------------
    // SEED PROJECTS (3 PER CATEGORY)
    // --------------------------------
    const projectCount = await Project.countDocuments();

    if (projectCount === 0) {
      const sampleMedia = [
        {
          url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
          public_id: "demo_sample_img",
          type: "image",
        },
        {
          url: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
          public_id: "demo_sample_video",
          type: "video",
        },
      ];

      const categories = ["webdev", "sketch", "creative"];
      const sampleProjects = [];

      for (let cat of categories) {
        for (let i = 1; i <= 3; i++) {
          sampleProjects.push({
            title: `${cat.toUpperCase()} Project ${i}`,
            description: `This is a sample ${cat} project created by the seed script.`,
            category: cat,
            tech: ["React", "Node.js", "MongoDB"],
            tags: ["demo", "sample"],
            media: sampleMedia,
            backgroundMedia: sampleMedia[0],
            links: [
              { label: "GitHub", url: "https://github.com/" },
              { label: "Live Demo", url: "https://example.com" },
            ],
            priority: 5 - i, // highest priority first
            published: true,
          });
        }
      }

      await Project.insertMany(sampleProjects);

      console.log(`✔ Created ${sampleProjects.length} sample projects\n`);
    } else {
      console.log("✔ Projects already exist — skipping\n");
    }

    console.log("🎉 SEEDING COMPLETED SUCCESSFULLY\n");
    process.exit(0);
  } catch (err) {
    console.error("❌ SEED ERROR:", err);
    process.exit(1);
  }
})();
