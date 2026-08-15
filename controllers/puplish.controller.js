import Paper from "../models/papers.models.js";
const publishPaper = async (req, res) => {
  try {
    const paper = new Paper({
      ...req.body,
      publishingDate: Date.now(),
      state: "pending",
      pdfUrl: "Will add it later",
    });
    await paper.save();
    res.json({ states: "Accepted Nigga" });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export { publishPaper };
