// auto-fetch-readings.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Reading from "./models/Reading.js";
import ReadingFetcher from "./services/readingFetcher.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/church_db";

const autoFetchReadings = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🔗 Connected to MongoDB");

    const fetcher = new ReadingFetcher();

    // Fetch readings for the next 7 days starting from today
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 6); // Next 7 days

    console.log(
      `📖 Fetching readings from ${today.toDateString()} to ${endDate.toDateString()}`
    );

    // Choose source: 'usccb' for US or 'philippines' for Philippine context
    const source = process.env.READINGS_SOURCE || "usccb";
    console.log(`📍 Using source: ${source.toUpperCase()}`);

    const fetchedReadings = await fetcher.fetchReadingsForDateRange(
      today,
      endDate,
      source
    );

    if (fetchedReadings.length === 0) {
      console.log("⚠️ No readings were fetched");
      return;
    }

    // Save to database (update existing or create new)
    let savedCount = 0;
    let updatedCount = 0;

    for (const reading of fetchedReadings) {
      try {
        const existingReading = await Reading.findOne({
          date: {
            $gte: new Date(
              reading.date.getFullYear(),
              reading.date.getMonth(),
              reading.date.getDate()
            ),
            $lt: new Date(
              reading.date.getFullYear(),
              reading.date.getMonth(),
              reading.date.getDate() + 1
            ),
          },
        });

        if (existingReading) {
          // Update existing reading
          await Reading.findByIdAndUpdate(existingReading._id, {
            title: reading.title,
            reading1: reading.reading1,
            psalm: reading.psalm,
            reading2: reading.reading2,
            gospel: reading.gospel,
            updatedAt: new Date(),
          });
          updatedCount++;
          console.log(`🔄 Updated reading for ${reading.date.toDateString()}`);
        } else {
          // Create new reading
          await Reading.create({
            date: reading.date,
            title: reading.title,
            reading1: reading.reading1,
            psalm: reading.psalm,
            reading2: reading.reading2,
            gospel: reading.gospel,
          });
          savedCount++;
          console.log(
            `✅ Saved new reading for ${reading.date.toDateString()}`
          );
        }
      } catch (dbError) {
        console.error(
          `❌ Database error for ${reading.date.toDateString()}:`,
          dbError.message
        );
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   • ${savedCount} new readings saved`);
    console.log(`   • ${updatedCount} existing readings updated`);
    console.log(`   • Total processed: ${savedCount + updatedCount}`);

    console.log("\n🎉 Auto-fetch completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Auto-fetch error:", err);
    process.exit(1);
  }
};

// Run immediately if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  autoFetchReadings();
}

export default autoFetchReadings;
