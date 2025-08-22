// models/History.js
import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    heroImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("History", historySchema);
