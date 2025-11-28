// backend/models/Project.js
const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
    type: { type: String, enum: ["image", "video"], required: true },
    caption: String,
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

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    category: {
      type: String,
      enum: ["webdev", "sketch", "creative"],
      required: true,
    },

    tags: [String],
    tech: [String],

    media: [MediaSchema],

    backgroundMedia: MediaSchema,

    links: [LinkSchema],

    priority: { type: Number, default: 0 },

    published: { type: Boolean, default: true },

    extra: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
