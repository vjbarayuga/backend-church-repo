// controllers/donationController.js
import Donation from "../models/Donation.js";

export const getAllDonations = async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
};

export const getDonationById = async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  res.json(donation);
};

export const createDonation = async (req, res) => {
  const newDonation = new Donation(req.body);
  await newDonation.save();
  res.status(201).json(newDonation);
};

export const updateDonation = async (req, res) => {
  const updated = await Donation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteDonation = async (req, res) => {
  await Donation.findByIdAndDelete(req.params.id);
  res.json({ message: "Donation deleted" });
};
