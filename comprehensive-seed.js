// comprehensive-seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "./models/Admin.js";
import Slideshow from "./models/Slideshow.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/church_db";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("🔗 Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({});
    if (!existingAdmin) {
      console.log(
        "ℹ️  No admin account found. Please create one using the registration endpoint."
      );
      console.log("📧 Use POST /api/admin/register with email and password");
    } else {
      console.log("� Admin account already exists");
    }

    // Seed Slideshow
    const existingSlides = await Slideshow.countDocuments();
    if (existingSlides === 0) {
      const defaultSlides = [
        {
          title:
            "Welcome to Minor Basilica and Archdiocesan Shrine of Our Lady of the Assumption",
          subtitle:
            "A place of worship, community, and spiritual growth. Join our parish family as we grow together in faith and love.",
          image: "/images/church-main.jpg",
          order: 1,
          buttonText: "Learn More",
          buttonLink: "/about-us",
          isActive: true,
        },
        {
          title: "Join Us for Mass",
          subtitle:
            "Come and experience the joy of worship with our parish family. All are welcome to celebrate the Eucharist with us.",
          image: "/images/mass-hero.jpg",
          order: 2,
          buttonText: "Mass Times",
          buttonLink: "/mass-schedule",
          isActive: true,
        },
        {
          title: "Growing in Faith Together",
          subtitle:
            "Building a strong community through faith, love, and service. Discover the many ways to get involved in parish life.",
          image: "/images/community.jpg",
          order: 3,
          buttonText: "Get Involved",
          buttonLink: "/events",
          isActive: true,
        },
      ];

      await Slideshow.insertMany(defaultSlides);
      console.log("✅ Slideshow data seeded successfully");
    } else {
      console.log("📋 Slideshow data already exists");
    }

    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();
