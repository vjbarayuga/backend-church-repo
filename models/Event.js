// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  heroImage: { type: String }, // Path or URL to hero image
});

export default mongoose.model("Event", eventSchema);
