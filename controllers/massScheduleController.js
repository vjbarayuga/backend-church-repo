// controllers/massScheduleController.js
import MassSchedule from "../models/MassSchedule.js";

export const getAllMassSchedules = async (req, res) => {
  const schedules = await MassSchedule.find().populate("priestId", "name");
  res.json(schedules);
};

export const getMassScheduleById = async (req, res) => {
  const schedule = await MassSchedule.findById(req.params.id).populate(
    "priestId",
    "name"
  );
  res.json(schedule);
};

export const createMassSchedule = async (req, res) => {
  const newSchedule = new MassSchedule(req.body);
  await newSchedule.save();
  res.status(201).json(newSchedule);
};

export const updateMassSchedule = async (req, res) => {
  const updated = await MassSchedule.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteMassSchedule = async (req, res) => {
  await MassSchedule.findByIdAndDelete(req.params.id);
  res.json({ message: "Mass schedule deleted" });
};
