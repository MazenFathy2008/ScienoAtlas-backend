import mongoose from "mongoose";
import supabase from "../config/supabase.config.js";
import Paper from "../models/papers.models.js";
import verifyToken from "../util/verfiy-token.js";
import User from "../models/user.model.js";
const publishPaper = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = await verifyToken(token);
    if (!req.file) {
      const error = new Error();
      error.statusCode = 400;
      error.errorCode = "FILE_REQUIRED";
      throw error;
    }

    if (req.file.mimetype !== "application/pdf") {
      const error = new Error();
      error.statusCode = 400;
      error.errorCode = "INVALID_FILE_TYPE";
      throw error;
    }
    const fileName = `${Date.now()}-${crypto.randomUUID()}.pdf`;
    const filePath = `pdfs/${fileName}`;
    const { error } = await supabase.storage
      .from("pdfs")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });
    if (error) {
      throw error;
    }
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      try {
        req.body.authors = JSON.parse(req.body.authors);
        req.body.tags = JSON.parse(req.body.tags);
      } catch {
        const error = new Error();
        error.statusCode = 400;
        error.errorCode = "INVALID_DATA_FORMAT";
        throw error;
      }
      const paper = await Paper.create(
        [
          {
            ...req.body,
            date: new Date(),
            state: "pending",
            file: filePath,
            uploadedBy: user._id,
          },
        ],
        { session },
      );
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          $push: {
            "publisedPapers.listOfPapers": paper[0]._id,
          },
          $inc: {
            "publisedPapers.count": 1,
          },
        },
        {
          session,
          new: true,
        },
      );
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      await supabase.storage.from("pdfs").remove([filePath]);
      throw err;
    } finally {
      await session.endSession();
    }
    res.status(201).json({ message: "Data has benn ent successfully" });
  } catch (err) {
    next(err);
  }
};
const getPapers = async (req, res, next) => {
  try {
    const data = await Paper.find();
    const papers = data.map((paper) => {
      // if (paper.state === "approved") {
      //   const pdfUrl = supabase.storage
      //     .from("pdfs")
      //     .getPublicUrl(`pdfs/${paper.pdfName}`).data.publicUrl;

      //   return {
      //     ...paper.toObject(),
      //     pdfUrl,
      //   };
      // } else {
      //   return null;
      // }
      paper.state = null;
      return paper;
    });
    res.json(papers);
  } catch (err) {
    next(err);
  }
};
export { publishPaper, getPapers };
