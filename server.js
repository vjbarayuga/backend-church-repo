import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./db/connectToMongoDB.js";
import priestRoutes from "./routes/priestRoutes.js";
import massScheduleRoutes from "./routes/massScheduleRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import slideshowRoutes from "./routes/slideshowRoutes.js";
import pageContentRoutes from "./routes/pageContentRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import sacramentRoutes from "./routes/sacramentRoutes.js";
import readingRoutes from "./routes/readingRoutes.js";

dotenv.config();

// Debug log to check if variables are loaded (remove after fixing)
console.log("Environment check:");
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/announcements", announcementRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/massschedule", massScheduleRoutes);
app.use("/api/priests", priestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/slideshow", slideshowRoutes);
app.use("/api/page-content", pageContentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/sacraments", sacramentRoutes);
app.use("/api/readings", readingRoutes);

const PORT = process.env.PORT || 5000;

connectToMongoDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
