import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  heroImage: { type: String }, // Path or URL to hero image
});

export default mongoose.model("Announcement", announcementSchema);
