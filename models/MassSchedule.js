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
});

export default mongoose.model("MassSchedule", massScheduleSchema);
