import mongoose from "mongoose";

const readingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  reading1: {
    type: String,
    required: true,
  },
  psalm: {
    type: String,
    required: true,
  },
  reading2: {
    type: String,
  },
  gospel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
readingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Reading", readingSchema);
