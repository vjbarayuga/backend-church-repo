// Upload hero image for page content
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
    console.error("PageContent upload error:", error);
    res.status(500).json({
      error: "Failed to upload file",
      details: error.message || error,
    });
  }
};
import PageContent from "../models/PageContent.js";

// Get page content by page name
export const getPageContent = async (req, res) => {
  try {
    const { pageName } = req.params;
    const content = await PageContent.findOne({ pageName, isActive: true });

    if (!content) {
      return res.status(404).json({ error: "Page content not found" });
    }

    // For mass-times, ensure all new fields are present
    if (pageName === "mass-times") {
      const {
        specialSchedules = [],
        officeHours = [],
        officeEmergencyNote = "",
        contactSection = { heading: "", description: "", phone: "", email: "" },
      } = content;
      return res.json({
        ...content.toObject(),
        specialSchedules,
        officeHours,
        officeEmergencyNote,
        contactSection,
      });
    }

    res.json(content);
  } catch (error) {
    console.error("Error fetching page content:", error);
    res.status(500).json({ error: "Failed to fetch page content" });
  }
};

// Get all page contents (admin)
export const getAllPageContents = async (req, res) => {
  try {
    const contents = await PageContent.find().sort({ pageName: 1 });
    res.json(contents);
  } catch (error) {
    console.error("Error fetching page contents:", error);
    res.status(500).json({ error: "Failed to fetch page contents" });
  }
};

// Create or update page content
export const upsertPageContent = async (req, res) => {
  try {
    const { pageName } = req.params;
    let updateData = req.body;

    // Only allow special fields for mass-times
    if (pageName === "mass-times") {
      updateData.specialSchedules = req.body.specialSchedules || [];
      updateData.officeHours = req.body.officeHours || [];
      updateData.officeEmergencyNote = req.body.officeEmergencyNote || "";
      updateData.contactSection = req.body.contactSection || {
        heading: "",
        description: "",
        phone: "",
        email: "",
      };
    } else {
      delete updateData.specialSchedules;
      delete updateData.officeHours;
      delete updateData.officeEmergencyNote;
      delete updateData.contactSection;
    }

    const content = await PageContent.findOneAndUpdate(
      { pageName },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );

    res.json(content);
  } catch (error) {
    console.error("Error updating page content:", error);
    res.status(500).json({ error: "Failed to update page content" });
  }
};

// Delete page content
export const deletePageContent = async (req, res) => {
  try {
    const { pageName } = req.params;
    await PageContent.findOneAndDelete({ pageName });
    res.json({ message: "Page content deleted successfully" });
  } catch (error) {
    console.error("Error deleting page content:", error);
    res.status(500).json({ error: "Failed to delete page content" });
  }
};
