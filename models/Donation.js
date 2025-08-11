import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donorName: String,
  amount: Number,
  message: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Donation", donationSchema);
