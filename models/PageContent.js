import mongoose from "mongoose";

const pageContentSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "about",
        "priest",
        "mass-times",
        "services",
        "events",
        "announcements",
        "our-history",
      ],
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
    // For mass-times page only
    specialSchedules: {
      type: Array, // Array of objects
      default: [],
    },
    officeHours: {
      type: Array, // Array of { days, hours }
      default: [],
    },
    officeEmergencyNote: {
      type: String,
      default: "",
    },
    contactSection: {
      type: Object, // { heading, description, phone, email }
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PageContent", pageContentSchema);
