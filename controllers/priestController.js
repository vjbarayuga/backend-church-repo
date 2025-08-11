// controllers/priestController.js
import Priest from "../models/Priest.js";

export const getAllPriests = async (req, res) => {
  const priests = await Priest.find();
  res.json(priests);
};

export const getPriestById = async (req, res) => {
  const priest = await Priest.findById(req.params.id);
  res.json(priest);
};

export const createPriest = async (req, res) => {
  const newPriest = new Priest(req.body);
  await newPriest.save();
  res.status(201).json(newPriest);
};

export const updatePriest = async (req, res) => {
  const updated = await Priest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deletePriest = async (req, res) => {
  await Priest.findByIdAndDelete(req.params.id);
  res.json({ message: "Priest deleted" });
};
