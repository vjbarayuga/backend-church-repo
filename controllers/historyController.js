// controllers/historyController.js
import History from "../models/History.js";
import path from "path";

// Get the church history (assumes only one record)
export const getHistory = async (req, res) => {
  try {
    const history = await History.findOne();
    if (!history) return res.json({ content: "" }); // default fallback
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching church history." });
  }
};

// Update or create church history
export const updateHistory = async (req, res) => {
  try {
    const { content } = req.body;
    let heroImage = req.body.heroImage;
    if (req.file) {
      heroImage = path.join("/images", req.file.filename).replace(/\\/g, "/");
    }
    let history = await History.findOne();
    if (history) {
      history.content = content;
      if (heroImage) history.heroImage = heroImage;
      await history.save();
    } else {
      history = new History({ content, heroImage });
      await history.save();
    }
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error saving church history." });
  }
};
