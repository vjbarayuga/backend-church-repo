import Slideshow from "../models/Slideshow.js";

// Upload image file
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Cloudinary multer-storage-cloudinary puts the URL in req.file.path
    const imageUrl = req.file.path;
    res.json({
      message: "File uploaded successfully",
      filePath: imageUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    // Enhanced error logging for all possible details
    console.error("=== Upload error (raw):", error);
    if (error && typeof error === "object") {
      for (const key of Object.keys(error)) {
        console.error(`=== Upload error property [${key}]:`, error[key]);
      }
    }
    if (error instanceof Error) {
      console.error("=== Upload error message:", error.message);
      console.error("=== Upload error stack:", error.stack);
    }
    try {
      console.error("=== Upload error JSON:", JSON.stringify(error));
    } catch (e) {
      console.error("=== Upload error JSON failed:", e);
    }
    res.status(500).json({
      error: "Failed to upload file",
      details: error.message || error,
    });
  }
};

// Get all active slides ordered by order field
export const getSlides = async (req, res) => {
  try {
    const slides = await Slideshow.find({ isActive: true })
      .sort({ order: 1 })
      .select("-__v");

    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch slides" });
  }
};

// Get all slides (including inactive ones) for admin
export const getAllSlides = async (req, res) => {
  try {
    const slides = await Slideshow.find()
      .sort({ order: 1, createdAt: -1 })
      .select("-__v");

    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch slides" });
  }
};

// Create a new slide
export const createSlide = async (req, res) => {
  try {
    const { title, subtitle, image, order, buttonText, buttonLink } = req.body;

    const slide = new Slideshow({
      title,
      subtitle,
      image,
      order: order || 0,
      buttonText: buttonText || "",
      buttonLink: buttonLink || "",
    });

    await slide.save();
    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a slide
export const updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const slide = await Slideshow.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }

    res.json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a slide
export const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;

    const slide = await Slideshow.findByIdAndDelete(id);

    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }

    res.json({ message: "Slide deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete slide" });
  }
};

// Toggle slide active status
export const toggleSlideStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const slide = await Slideshow.findById(id);
    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }

    slide.isActive = !slide.isActive;
    await slide.save();

    res.json(slide);
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle slide status" });
  }
};
