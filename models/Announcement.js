import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Announcement", announcementSchema);
