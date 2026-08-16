import supabase from "../config/supabase.config.js";
import Paper from "../models/papers.models.js";
const publishPaper = async (req, res, next) => {
  try {
    if (req.file.mimetype !== "application/pdf") {
      const error = new Error(
        "File formate is wrong, Please Upload PDF files only",
      );
      error.name = "FileTypeError";
      error.statusCode = 400;
      throw error;
    }
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const paper = new Paper({
      ...req.body,
      publishingDate: Date.now(),
      state: "pending",
      pdfName: fileName,
    });
    await paper.save();
    await supabase.storage
      .from("pdfs")
      .upload(`pdfs/${fileName}`, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });
    res.json({ states: "Accepted Nigga" });
  } catch (err) {
    next(err);
  }
};
const getPapers = async (req, res, next) => {
  try {
    const data = await Paper.find();
    const papers = data.map((paper) => {
      if (paper.state === "approved") {
        const pdfUrl = supabase.storage
          .from("pdfs")
          .getPublicUrl(`pdfs/${paper.pdfName}`).data.publicUrl;

        return {
          ...paper.toObject(),
          pdfUrl,
        };
      } else {
        return null;
      }
    });
    res.json(papers);
  } catch (err) {
    next(err);
  }
};
export { publishPaper, getPapers };
