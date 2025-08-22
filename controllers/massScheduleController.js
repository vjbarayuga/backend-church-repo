import MassSchedule from "../models/MassSchedule.js";
import path from "path";

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
  try {
    let heroImage = req.body.heroImage;
    if (req.file) {
      heroImage = path.join("/images", req.file.filename).replace(/\\/g, "/");
    }
    const newSchedule = new MassSchedule({
      ...req.body,
      heroImage,
    });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: "Failed to create mass schedule" });
  }
};

export const updateMassSchedule = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      updateData.heroImage = path
        .join("/images", req.file.filename)
        .replace(/\\/g, "/");
    }
    const updated = await MassSchedule.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update mass schedule" });
  }
};

export const deleteMassSchedule = async (req, res) => {
  await MassSchedule.findByIdAndDelete(req.params.id);
  res.json({ message: "Mass schedule deleted" });
};
