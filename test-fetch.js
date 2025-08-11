// test-fetch.js
import ReadingFetcher from "./services/readingFetcher.js";

const testFetch = async () => {
  try {
    console.log("🧪 Testing reading fetcher...");

    const fetcher = new ReadingFetcher();
    const today = new Date();

    console.log(`📅 Fetching reading for ${today.toDateString()}`);

    const reading = await fetcher.fetchReadings(today, "usccb");

    console.log("✅ Successfully fetched reading:");
    console.log(`   Title: ${reading.title}`);
    console.log(`   Reading 1: ${reading.reading1}`);
    console.log(`   Psalm: ${reading.psalm}`);
    console.log(`   Reading 2: ${reading.reading2}`);
    console.log(`   Gospel: ${reading.gospel}`);
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
};

testFetch();
