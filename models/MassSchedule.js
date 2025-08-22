import mongoose from "mongoose";

const massScheduleSchema = new mongoose.Schema({
  day: String,
  time: String,
  location: String,
  priestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Priest",
    required: false,
  },
  heroImage: { type: String }, // Path or URL to hero image
});

export default mongoose.model("MassSchedule", massScheduleSchema);
