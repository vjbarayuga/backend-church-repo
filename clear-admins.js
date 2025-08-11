// clear-admins.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/church_db";

const clearAdmins = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🔗 Connected to MongoDB");

    const result = await Admin.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} admin accounts`);

    console.log("✅ All admin accounts cleared");
    console.log(
      "💡 You can now create a new admin account using: node create-admin.js"
    );

    process.exit(0);
  } catch (err) {
    console.error("❌ Error clearing admins:", err.message);
    process.exit(1);
  }
};

clearAdmins();
