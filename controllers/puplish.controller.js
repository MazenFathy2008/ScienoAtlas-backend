import supabase from "../config/supabase.config.js";
import Paper from "../models/papers.models.js";
const publishPaper = async (req, res, next) => {
  try {
    console.log(await Paper.collection.indexes());
    if (req.file.mimetype !== "application/pdf") {
      const error = new Error(
        "File formate is wrong, Please Upload PDF files only",
      );
      error.name = "FileTypeError";
      error.statusCode = 409;
      throw error;
    }
    const fileUrl = `${Date.now()}-${req.file.originalname}`;
    const paper = new Paper({
      ...req.body,
      publishingDate: Date.now(),
      state: "pending",
      pdfUrl: fileUrl,
    });
    await paper.save();
    supabase.storage.from("pdfs").upload(`pdfs/${fileUrl}`, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: false,
    });
    res.json({ states: "Accepted Nigga" });
  } catch (err) {
    next(err);
  }
};

export { publishPaper };
