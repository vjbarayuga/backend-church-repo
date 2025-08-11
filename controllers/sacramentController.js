import Sacrament from "../models/Sacrament.js";

// Get all active sacraments
export const getSacraments = async (req, res) => {
  try {
    const sacraments = await Sacrament.find({ isActive: true }).sort({
      name: 1,
    });
    res.json(sacraments);
  } catch (error) {
    console.error("Error fetching sacraments:", error);
    res.status(500).json({ error: "Failed to fetch sacraments" });
  }
};

// Get all sacraments (admin)
export const getAllSacraments = async (req, res) => {
  try {
    const sacraments = await Sacrament.find().sort({ name: 1 });
    res.json(sacraments);
  } catch (error) {
    console.error("Error fetching sacraments:", error);
    res.status(500).json({ error: "Failed to fetch sacraments" });
  }
};

// Get sacrament by name
export const getSacramentByName = async (req, res) => {
  try {
    const { name } = req.params;
    const sacrament = await Sacrament.findOne({ name, isActive: true });

    if (!sacrament) {
      return res.status(404).json({ error: "Sacrament not found" });
    }

    res.json(sacrament);
  } catch (error) {
    console.error("Error fetching sacrament:", error);
    res.status(500).json({ error: "Failed to fetch sacrament" });
  }
};

// Get sacrament by ID
export const getSacramentById = async (req, res) => {
  try {
    const sacrament = await Sacrament.findById(req.params.id);
    if (!sacrament) {
      return res.status(404).json({ error: "Sacrament not found" });
    }
    res.json(sacrament);
  } catch (error) {
    console.error("Error fetching sacrament:", error);
    res.status(500).json({ error: "Failed to fetch sacrament" });
  }
};

// Create new sacrament
export const createSacrament = async (req, res) => {
  try {
    const sacrament = new Sacrament(req.body);
    await sacrament.save();
    res.status(201).json(sacrament);
  } catch (error) {
    console.error("Error creating sacrament:", error);
    res.status(500).json({ error: "Failed to create sacrament" });
  }
};

// Update sacrament
export const updateSacrament = async (req, res) => {
  try {
    const sacrament = await Sacrament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!sacrament) {
      return res.status(404).json({ error: "Sacrament not found" });
    }

    res.json(sacrament);
  } catch (error) {
    console.error("Error updating sacrament:", error);
    res.status(500).json({ error: "Failed to update sacrament" });
  }
};

// Delete sacrament
export const deleteSacrament = async (req, res) => {
  try {
    const sacrament = await Sacrament.findByIdAndDelete(req.params.id);
    if (!sacrament) {
      return res.status(404).json({ error: "Sacrament not found" });
    }
    res.json({ message: "Sacrament deleted successfully" });
  } catch (error) {
    console.error("Error deleting sacrament:", error);
    res.status(500).json({ error: "Failed to delete sacrament" });
  }
};

// Toggle sacrament status
export const toggleSacramentStatus = async (req, res) => {
  try {
    const sacrament = await Sacrament.findById(req.params.id);
    if (!sacrament) {
      return res.status(404).json({ error: "Sacrament not found" });
    }

    sacrament.isActive = !sacrament.isActive;
    await sacrament.save();

    res.json(sacrament);
  } catch (error) {
    console.error("Error toggling sacrament status:", error);
    res.status(500).json({ error: "Failed to toggle sacrament status" });
  }
};
