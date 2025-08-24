// controllers/announcementController.js
import Announcement from "../models/Announcement.js";
import path from "path";

export const getAllAnnouncements = async (req, res) => {
  const announcements = await Announcement.find();
  res.json(announcements);
};

export const getAnnouncementById = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  res.json(announcement);
};

export const createAnnouncement = async (req, res) => {
  try {
    let heroImage = req.body.heroImage;
    if (req.file) {
      heroImage = req.file.path; // Cloudinary URL
    }
    const newAnnouncement = new Announcement({
      ...req.body,
      heroImage,
    });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: "Failed to create announcement" });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      updateData.heroImage = req.file.path; // Cloudinary URL
    }
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update announcement" });
  }
};

export const deleteAnnouncement = async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ message: "Announcement deleted" });
};
