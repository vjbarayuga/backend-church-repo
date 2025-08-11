// quick-create-admin.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/church_db";

const createAdminQuick = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🔗 Connected to MongoDB");

    // Create default admin for testing
    const email = "admin@church.com";
    const password = "admin123";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("⚠️  Admin already exists with this email");
      process.exit(0);
    }

    // Hash password and create admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    await admin.save();

    console.log("✅ Test admin account created successfully!");
    console.log("📧 Email:", email);
    console.log("🔐 Password:", password);
    console.log("🌐 Login at: http://localhost:5174/admin/login");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdminQuick();
