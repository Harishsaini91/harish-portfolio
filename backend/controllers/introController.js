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
        description: "I’m a motivated software developer with practical experience in full-stack web development. I’m looking for an internship or junior role where I can apply my skills, learn from real projects, and add value to the team.",
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
