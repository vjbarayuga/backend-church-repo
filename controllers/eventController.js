// controllers/eventController.js
import Event from "../models/Event.js";

export const getAllEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
};

export const createEvent = async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.status(201).json(newEvent);
};

export const updateEvent = async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};
