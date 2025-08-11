// services/readingFetcher.js
import axios from "axios";
import * as cheerio from "cheerio";

class ReadingFetcher {
  constructor() {
    this.sources = {
      usccb: "https://bible.usccb.org",
      philippines: "https://www.cbcponline.net",
    };
    this.cache = new Map(); // Simple in-memory cache
    this.cacheTimeout = 1000 * 60 * 60; // 1 hour cache
  }

  // Format date for USCCB URL (MMDDYY format)
  formatDateForUSCCB(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}${day}${year}`;
  }

  // Fetch readings from USCCB with caching
  async fetchFromUSCCB(date) {
    const dateStr = this.formatDateForUSCCB(date);
    const cacheKey = `usccb-${dateStr}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        console.log(`📋 Using cached reading for ${date.toDateString()}`);
        return cached.data;
      }
    }

    try {
      const url = `${this.sources.usccb}/bible/readings/${dateStr}.cfm`;
      console.log(`🌐 Fetching from: ${url}`);

      const response = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        timeout: 5000, // Reduced timeout to 5 seconds
      });

      const $ = cheerio.load(response.data);

      // Extract title - look for the liturgical title
      let title = "";

      // Try multiple selectors for the liturgical title
      const titleSelectors = [
        'h2:contains("Week in Ordinary Time")',
        'h2:contains("Sunday")',
        'h2:contains("Memorial")',
        'h2:contains("Feast")',
        "h2",
      ];

      for (const selector of titleSelectors) {
        const titleElement = $(selector).first();
        if (titleElement.length > 0) {
          const titleText = titleElement.text().trim();
          if (
            titleText &&
            !titleText.includes("Menu") &&
            !titleText.includes("Daily Readings")
          ) {
            title = titleText;
            break;
          }
        }
      }

      // Fallback title
      if (!title) {
        title = this.getPhilippineLiturgicalTitle(date);
      }

      // Extract readings
      const readings = {
        title,
        reading1: "",
        psalm: "",
        reading2: "",
        gospel: "",
      };

      // Find all sections
      const sections = $("h3");

      sections.each((index, element) => {
        const sectionTitle = $(element).text().trim().toLowerCase();
        const nextContent = $(element).nextUntil("h3").text().trim();

        if (
          sectionTitle.includes("reading 1") ||
          sectionTitle.includes("first reading")
        ) {
          readings.reading1 = this.extractScriptureReference($(element));
        } else if (
          sectionTitle.includes("psalm") ||
          sectionTitle.includes("responsorial")
        ) {
          readings.psalm = this.extractScriptureReference($(element));
        } else if (
          sectionTitle.includes("reading 2") ||
          sectionTitle.includes("second reading")
        ) {
          readings.reading2 = this.extractScriptureReference($(element));
        } else if (sectionTitle.includes("gospel")) {
          readings.gospel = this.extractScriptureReference($(element));
        }
      });

      // Cache the result
      this.cache.set(cacheKey, {
        data: readings,
        timestamp: Date.now(),
      });

      return readings;
    } catch (error) {
      console.error("Error fetching from USCCB:", error.message);
      throw error;
    }
  }

  // Extract scripture reference from section
  extractScriptureReference(element) {
    const linkElement = element.next().find("a").first();
    if (linkElement.length > 0) {
      return linkElement.text().trim();
    }

    // Fallback: look for text in brackets or common patterns
    const text = element.next().text();
    const matches = text.match(/([A-Za-z0-9\s]+\s\d+:\d+[-,\s\d]*)/);
    return matches ? matches[1].trim() : "";
  }

  // Alternative: Fetch readings from a Philippine Catholic source
  async fetchFromPhilippines(date) {
    try {
      // This is a placeholder for Philippine Catholic readings
      // You would implement similar scraping for local Philippine sources

      const readings = {
        title: this.getPhilippineLiturgicalTitle(date),
        reading1: "",
        psalm: "",
        reading2: "",
        gospel: "",
      };

      // For now, return the same readings as USCCB since they follow the same liturgical calendar
      // In practice, you might want to fetch from a local Philippine Catholic website
      return await this.fetchFromUSCCB(date);
    } catch (error) {
      console.error("Error fetching Philippine readings:", error.message);
      throw error;
    }
  }

  // Get liturgical title for Philippine context
  getPhilippineLiturgicalTitle(date) {
    const dayOfWeek = date.getDay();
    const weekOfYear = this.getWeekOfYear(date);

    // Simple liturgical calendar logic
    if (dayOfWeek === 0) {
      // Sunday
      return `${this.getOrdinalNumber(weekOfYear)} Sunday in Ordinary Time`;
    } else {
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return `${dayNames[dayOfWeek]} of the ${this.getOrdinalNumber(
        weekOfYear
      )} Week in Ordinary Time`;
    }
  }

  // Quick fallback readings generation (when web scraping fails)
  generateFallbackReading(date) {
    const dayOfWeek = date.getDay();
    const weekOfYear = this.getWeekOfYear(date);
    
    // Common scripture patterns for different days
    const readings = {
      0: { // Sunday
        title: `${this.getOrdinalNumber(weekOfYear)} Sunday in Ordinary Time`,
        reading1: "Genesis 1:1-5",
        psalm: "Psalm 104:1-2, 5-6, 10, 12, 13-14",
        reading2: "Romans 1:1-7",
        gospel: "Mark 1:14-20"
      },
      1: { // Monday
        title: `Monday of the ${this.getOrdinalNumber(weekOfYear)} Week in Ordinary Time`,
        reading1: "Hebrews 1:1-6",
        psalm: "Psalm 97:1, 2b, 6-7, 9",
        reading2: "",
        gospel: "Mark 1:14-20"
      }
    };

    const fallback = readings[dayOfWeek] || readings[1]; // Default to Monday pattern
    
    console.log(`🔄 Generated fallback reading for ${date.toDateString()}`);
    return fallback;
  }

  // Helper functions
  getWeekOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.ceil(diff / oneWeek);
  }

  getOrdinalNumber(num) {
    const ordinals = [
      "",
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eighth",
      "Ninth",
      "Tenth",
      "Eleventh",
      "Twelfth",
      "Thirteenth",
      "Fourteenth",
      "Fifteenth",
      "Sixteenth",
      "Seventeenth",
      "Eighteenth",
      "Nineteenth",
      "Twentieth",
    ];
    return ordinals[num] || `${num}th`;
  }

  // Main fetch method with fallback and faster response
  async fetchReadings(date, source = "usccb", useFallback = true) {
    try {
      console.log(`📖 Fetching readings for ${date.toDateString()} from ${source}`);

      let readings;
      if (source === "philippines") {
        readings = await this.fetchFromPhilippines(date);
      } else {
        readings = await this.fetchFromUSCCB(date);
      }

      // Validate readings
      if (!readings.reading1 || !readings.gospel) {
        throw new Error("Incomplete readings data");
      }

      return readings;
    } catch (error) {
      console.error(`❌ Failed to fetch from ${source}:`, error.message);

      // Try alternative source first
      if (source === "usccb" && useFallback) {
        console.log("🔄 Trying Philippine source...");
        try {
          return await this.fetchReadings(date, "philippines", false);
        } catch (altError) {
          console.error("❌ Philippine source also failed:", altError.message);
        }
      }

      // Use fallback if enabled
      if (useFallback) {
        console.log("🔄 Using fallback reading generation...");
        return this.generateFallbackReading(date);
      }

      throw error;
    }
  }

  // Optimized batch fetch with parallel processing
  async fetchReadingsForDateRange(startDate, endDate, source = "usccb") {
    const dates = [];
    const currentDate = new Date(startDate);
    
    // Generate array of dates
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(`📅 Fetching readings for ${dates.length} days in parallel...`);

    // Process in smaller batches to avoid overwhelming the server
    const batchSize = 3; // Process 3 days at a time
    const results = [];
    
    for (let i = 0; i < dates.length; i += batchSize) {
      const batch = dates.slice(i, i + batchSize);
      console.log(`🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(dates.length / batchSize)}`);
      
      // Process batch in parallel
      const batchPromises = batch.map(async (date) => {
        try {
          const reading = await this.fetchReadings(date, source);
          return {
            date,
            ...reading,
            success: true,
          };
        } catch (error) {
          console.error(`❌ Failed to fetch reading for ${date.toDateString()}:`, error.message);
          return {
            date,
            error: error.message,
            success: false,
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Short delay between batches to be respectful to the server
      if (i + batchSize < dates.length) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }

    // Filter successful results
    const successfulReadings = results.filter(r => r.success);
    const failedCount = results.length - successfulReadings.length;
    
    console.log(`✅ Successfully fetched ${successfulReadings.length} readings`);
    if (failedCount > 0) {
      console.log(`⚠️  Failed to fetch ${failedCount} readings`);
    }

    return successfulReadings;
  }
}

export default ReadingFetcher;
