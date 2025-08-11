// controllers/announcementController.js
import Announcement from "../models/Announcement.js";

export const getAllAnnouncements = async (req, res) => {
  const announcements = await Announcement.find();
  res.json(announcements);
};

export const getAnnouncementById = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  res.json(announcement);
};

export const createAnnouncement = async (req, res) => {
  const newAnnouncement = new Announcement(req.body);
  await newAnnouncement.save();
  res.status(201).json(newAnnouncement);
};

export const updateAnnouncement = async (req, res) => {
  const updated = await Announcement.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteAnnouncement = async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ message: "Announcement deleted" });
};
