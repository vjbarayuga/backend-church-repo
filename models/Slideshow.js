import mongoose from "mongoose";

const slideshowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true, // This will store the image filename or URL
    },
    order: {
      type: Number,
      default: 0, // For ordering slides
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    buttonText: {
      type: String,
      default: "", // Optional call-to-action button
    },
    buttonLink: {
      type: String,
      default: "", // Optional link for the button
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying by order and active status
slideshowSchema.index({ order: 1, isActive: 1 });

export default mongoose.model("Slideshow", slideshowSchema);
