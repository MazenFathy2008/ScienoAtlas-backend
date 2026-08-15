import Paper from "../models/papers.models.js";
const publishPaper = async (req, res, next) => {
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
    next(err);
  }
};

export { publishPaper };
