// controllers/priestController.js
import Priest from "../models/Priest.js";
import path from "path";

export const getAllPriests = async (req, res) => {
  const priests = await Priest.find();
  res.json(priests);
};

export const getPriestById = async (req, res) => {
  const priest = await Priest.findById(req.params.id);
  res.json(priest);
};

export const createPriest = async (req, res) => {
  try {
    let photo = req.body.photo;
    if (req.file) {
      photo = req.file.path; // Cloudinary URL
    }
    const newPriest = new Priest({
      ...req.body,
      photo,
    });
    await newPriest.save();
    res.status(201).json(newPriest);
  } catch (error) {
    res.status(500).json({ error: "Failed to create priest" });
  }
};

export const updatePriest = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      updateData.photo = req.file.path; // Cloudinary URL
    }
    const updated = await Priest.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update priest" });
  }
};

export const deletePriest = async (req, res) => {
  await Priest.findByIdAndDelete(req.params.id);
  res.json({ message: "Priest deleted" });
};
