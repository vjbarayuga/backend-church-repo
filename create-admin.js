// create-admin.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";
import readline from "readline";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/church_db";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🔗 Connected to MongoDB");

    // Check if any admin already exists
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      console.log("⚠️  An admin account already exists.");
      console.log(`📧 Existing admin email: ${existingAdmin.email}`);

      const overwrite = await question(
        "Do you want to create a new admin anyway? (y/N): "
      );
      if (
        overwrite.toLowerCase() !== "y" &&
        overwrite.toLowerCase() !== "yes"
      ) {
        console.log("❌ Admin creation cancelled.");
        process.exit(0);
      }
    }

    console.log("\n🔐 Create New Admin Account");
    console.log("===========================");

    const email = await question("Enter admin email: ");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format");
      process.exit(1);
    }

    // Check if email already exists
    const emailExists = await Admin.findOne({ email });
    if (emailExists) {
      console.log("❌ An admin with this email already exists");
      process.exit(1);
    }

    const password = await question(
      "Enter admin password (min 6 characters): "
    );

    // Validate password length
    if (password.length < 6) {
      console.log("❌ Password must be at least 6 characters long");
      process.exit(1);
    }

    const confirmPassword = await question("Confirm password: ");

    if (password !== confirmPassword) {
      console.log("❌ Passwords do not match");
      process.exit(1);
    }

    // Hash password and create admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    await admin.save();

    console.log("\n✅ Admin account created successfully!");
    console.log("📧 Email:", email);
    console.log("🔐 You can now login to the admin dashboard");
    console.log("🌐 Access: http://localhost:5174/admin/login");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  } finally {
    rl.close();
  }
};

createAdmin();
