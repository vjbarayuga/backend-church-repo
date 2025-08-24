import Service from "../models/Service.js";
import path from "path";

// Only allow these services
const allowedServices = ["Holy Baptism", "Christian Burial", "Holy Matrimony"];

// Get all active services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
      name: { $in: allowedServices },
    }).sort({
      order: 1,
      name: 1,
    });
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// Get all services (admin)
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({
      name: { $in: allowedServices },
    }).sort({ order: 1, name: 1 });
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service || !allowedServices.includes(service.name)) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Failed to fetch service" });
  }
};

// Create new service
export const createService = async (req, res) => {
  try {
    if (!allowedServices.includes(req.body.name)) {
      return res.status(400).json({ error: "Service not allowed" });
    }
    let image = req.body.image;
    if (req.file) {
      image = req.file.path; // Cloudinary URL
    }
    const service = new Service({
      ...req.body,
      image,
    });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    if (!allowedServices.includes(req.body.name)) {
      return res.status(400).json({ error: "Service not allowed" });
    }
    let updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path; // Cloudinary URL
    }
    const service = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service || !allowedServices.includes(service.name)) {
      return res.status(404).json({ error: "Service not found" });
    }
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
};

// Toggle service status
export const toggleServiceStatus = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    service.isActive = !service.isActive;
    await service.save();

    res.json(service);
  } catch (error) {
    console.error("Error toggling service status:", error);
    res.status(500).json({ error: "Failed to toggle service status" });
  }
};
