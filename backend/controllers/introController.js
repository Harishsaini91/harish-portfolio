// backend/controllers/introController.js
const Intro = require("../models/Intro");

exports.getIntro = async (req, res) => {
  try {
    let intro = await Intro.findOne();

    // Create default intro if none exists
    if (!intro) {
      intro = await Intro.create({
        name: "Your Name",
        bioLines: ["Welcome to my portfolio"],
        description: "This is my intro section.",
      });
    }

    res.json(intro);
  } catch (err) {
    console.error("Intro load error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateIntro = async (req, res) => {
  try {
    const body = req.body;

    let intro = await Intro.findOne();
    if (!intro) intro = await Intro.create({});

    // update fields dynamically
    Object.assign(intro, body);

    await intro.save();

    res.json(intro);
  } catch (err) {
    console.error("Intro update error:", err);
    res.status(500).json({ error: err.message });
  }
};
