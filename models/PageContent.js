import mongoose from "mongoose";

const pageContentSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
      unique: true,
      enum: ["about", "priest", "mass-times", "services"],
    },
    heroImage: {
      type: String,
      default: "",
    },
    heroTitle: {
      type: String,
      default: "",
    },
    heroSubtitle: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PageContent", pageContentSchema);
