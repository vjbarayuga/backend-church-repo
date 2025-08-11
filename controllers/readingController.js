import Reading from "../models/Reading.js";
import ReadingFetcher from "../services/readingFetcher.js";

// Get all readings
export const getAllReadings = async (req, res) => {
  try {
    const readings = await Reading.find().sort({ date: -1 });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reading by date
export const getReadingByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const reading = await Reading.findOne({
      date: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (!reading) {
      return res
        .status(404)
        .json({ message: "Reading not found for this date" });
    }

    res.json(reading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get today's reading
export const getTodaysReading = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const reading = await Reading.findOne({
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    if (!reading) {
      return res.status(404).json({ message: "No reading found for today" });
    }

    res.json(reading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new reading
export const createReading = async (req, res) => {
  try {
    const { date, title, reading1, psalm, reading2, gospel } = req.body;

    // Check if reading already exists for this date
    const existingReading = await Reading.findOne({ date: new Date(date) });
    if (existingReading) {
      return res
        .status(400)
        .json({ message: "Reading already exists for this date" });
    }

    const reading = new Reading({
      date: new Date(date),
      title,
      reading1,
      psalm,
      reading2,
      gospel,
    });

    const savedReading = await reading.save();
    res.status(201).json(savedReading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update reading
export const updateReading = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, title, reading1, psalm, reading2, gospel } = req.body;

    const reading = await Reading.findByIdAndUpdate(
      id,
      {
        date: new Date(date),
        title,
        reading1,
        psalm,
        reading2,
        gospel,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!reading) {
      return res.status(404).json({ message: "Reading not found" });
    }

    res.json(reading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete reading
export const deleteReading = async (req, res) => {
  try {
    const { id } = req.params;
    const reading = await Reading.findByIdAndDelete(id);

    if (!reading) {
      return res.status(404).json({ message: "Reading not found" });
    }

    res.json({ message: "Reading deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Auto-fetch readings from external source
export const autoFetchReadings = async (req, res) => {
  try {
    const { source = "usccb", days = 7, quick = false } = req.body;

    const fetcher = new ReadingFetcher();
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + (days - 1));

    console.log(`Auto-fetching readings for ${days} days from ${source} (quick: ${quick})`);

    // Send immediate response for quick mode
    if (quick) {
      res.json({
        message: "Quick fetch started",
        status: "processing",
        estimated_time: "30-60 seconds"
      });
      
      // Process in background
      setImmediate(async () => {
        try {
          const fetchedReadings = await fetcher.fetchReadingsForDateRange(
            today,
            endDate,
            source
          );
          if (fetchedReadings.length > 0) {
            await saveReadingsToDatabase(fetchedReadings);
            console.log('✅ Background fetch completed successfully');
          }
        } catch (error) {
          console.error('❌ Background fetch failed:', error);
        }
      });
      return;
    }

    // Regular synchronous fetch
    const fetchedReadings = await fetcher.fetchReadingsForDateRange(
      today,
      endDate,
      source
    );

    if (fetchedReadings.length === 0) {
      return res.status(404).json({ message: "No readings could be fetched" });
    }

    const result = await saveReadingsToDatabase(fetchedReadings);

    res.json({
      message: "Auto-fetch completed",
      summary: result
    });
  } catch (error) {
    console.error("Auto-fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Helper function to save readings to database
async function saveReadingsToDatabase(fetchedReadings) {
  let savedCount = 0;
  let updatedCount = 0;
  const errors = [];

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
        await Reading.findByIdAndUpdate(existingReading._id, {
          title: reading.title,
          reading1: reading.reading1,
          psalm: reading.psalm,
          reading2: reading.reading2,
          gospel: reading.gospel,
          updatedAt: new Date(),
        });
        updatedCount++;
      } else {
        await Reading.create({
          date: reading.date,
          title: reading.title,
          reading1: reading.reading1,
          psalm: reading.psalm,
          reading2: reading.reading2,
          gospel: reading.gospel,
        });
        savedCount++;
      }
    } catch (dbError) {
      errors.push(`${reading.date.toDateString()}: ${dbError.message}`);
    }
  }

  return {
    saved: savedCount,
    updated: updatedCount,
    total: savedCount + updatedCount,
    errors: errors.length,
    errorDetails: errors,
  };
}
