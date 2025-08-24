// controllers/eventController.js
import Event from "../models/Event.js";
// For file upload
import path from "path";

export const getAllEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
};

export const createEvent = async (req, res) => {
  try {
    let heroImage = req.body.heroImage;
    if (req.file) {
      heroImage = req.file.path; // Cloudinary URL
    }
    const newEvent = new Event({
      ...req.body,
      heroImage,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      updateData.heroImage = req.file.path; // Cloudinary URL
    }
    const updated = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
};

export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};
