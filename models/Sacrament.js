import mongoose from "mongoose";

const sacramentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["baptism", "wedding", "burial", "confirmation", "communion"],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        item: String,
        required: Boolean,
        notes: String,
      },
    ],
    processSteps: [
      {
        step: Number,
        title: String,
        description: String,
        timeframe: String,
      },
    ],
    fees: [
      {
        item: String,
        amount: String,
        notes: String,
      },
    ],
    schedule: {
      type: String,
      default: "",
    },
    contactPerson: {
      type: String,
      default: "",
    },
    contactInfo: {
      type: String,
      default: "",
    },
    image: {
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

export default mongoose.model("Sacrament", sacramentSchema);
