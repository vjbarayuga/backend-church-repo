// update-church-name.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Slideshow from "./models/Slideshow.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/church_db";

const updateChurchName = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("🔗 Connected to MongoDB");

    // Update slideshow data with new church name
    const result = await Slideshow.updateOne(
      { title: "Welcome to St. Michael Church" },
      {
        title:
          "Welcome to Minor Basilica and Archdiocesan Shrine of Our Lady of the Assumption",
      }
    );

    if (result.modifiedCount > 0) {
      console.log("✅ Slideshow title updated successfully");
    } else {
      console.log("📋 No slideshow records needed updating");
    }

    console.log("🎉 Church name update completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Update error:", err);
    process.exit(1);
  }
};

updateChurchName();
