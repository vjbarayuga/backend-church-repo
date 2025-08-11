import PageContent from "../models/PageContent.js";

// Get page content by page name
export const getPageContent = async (req, res) => {
  try {
    const { pageName } = req.params;
    const content = await PageContent.findOne({ pageName, isActive: true });

    if (!content) {
      return res.status(404).json({ error: "Page content not found" });
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
    const updateData = req.body;

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
