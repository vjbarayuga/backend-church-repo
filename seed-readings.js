// seed-readings.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Reading from "./models/Reading.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/church_db";

const seedReadings = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("🔗 Connected to MongoDB");

    // Sample readings data
    const readings = [
      {
        date: new Date("2025-07-28"),
        title: "Seventeenth Sunday in Ordinary Time",
        reading1: "Genesis 18:20-32",
        psalm: "Psalm 138:1-2, 2-3, 6-7, 7-8",
        reading2: "Colossians 2:12-14",
        gospel: "Luke 11:1-13",
      },
      {
        date: new Date("2025-07-29"),
        title: "Memorial of Saint Martha",
        reading1: "Exodus 32:15-24, 30-34",
        psalm: "Psalm 106:19-20, 21-22, 23",
        reading2: "",
        gospel: "Matthew 13:31-35",
      },
      {
        date: new Date("2025-07-30"),
        title: "Tuesday of the Seventeenth Week in Ordinary Time",
        reading1: "Exodus 33:7-11; 34:5b-9, 28",
        psalm: "Psalm 103:6-7, 8-9, 10-11, 12-13",
        reading2: "",
        gospel: "Matthew 13:36-43",
      },
      // Add more readings as needed
    ];

    // Clear existing readings
    await Reading.deleteMany({});
    console.log("🗑️ Cleared existing readings");

    // Insert new readings
    await Reading.insertMany(readings);
    console.log("✅ Sample readings inserted successfully");

    console.log("🎉 Reading seed completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedReadings();
