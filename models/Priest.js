import mongoose from "mongoose";

const priestSchema = new mongoose.Schema({
  name: String,
  bio: String,
  photo: String,
});

export default mongoose.model("Priest", priestSchema);
