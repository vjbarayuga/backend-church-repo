import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    requirements: [
      {
        type: String,
      },
    ],
    processSteps: [
      {
        step: String,
        description: String,
      },
    ],
    fees: {
      type: String,
      default: "",
    },
    contactInfo: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceSchema);
