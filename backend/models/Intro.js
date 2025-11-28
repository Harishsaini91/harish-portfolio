// backend/models/Intro.js
const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
    type: { type: String, enum: ["image", "video"] },
  },
  { _id: false }
);

const LinkSchema = new mongoose.Schema(
  {
    label: String,
    url: String,
  },
  { _id: false }
);

const IntroSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Your Name" },

    profileImage: MediaSchema,

    backgroundMedia: MediaSchema,
    backgroundFallback: MediaSchema, // optional

    bioLines: { type: [String], default: [] },
    bioTypingEffect: { type: Boolean, default: true },

    description: { type: String, default: "" },

    links: [LinkSchema],

    resumeUrl: String,
    contactEmail: String,

    overlayOpacity: { type: Number, default: 0.35 },

    // Allow flexible extra fields
    extra: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intro", IntroSchema);
