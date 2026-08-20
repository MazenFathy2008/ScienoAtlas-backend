import supabase from "../config/supabase.config.js";
import Paper from "../models/papers.models.js";
import verifyToken from "../util/verfiy-token.js";

export default async function paperLinkController(req, res, next) {
  try {
    const token = req.cookies.token;
    await verifyToken(token);
    const { id } = req.params;
    const paper = await Paper.findById(id);
    if (!paper) {
      const error = new Error();
      error.statusCode = 404;
      error.errorCode = "DATA_NOT_FOUND";
      throw error;
    }
    const filePath = paper.file;
    const { data } = supabase.storage.from("pdfs").getPublicUrl(filePath);
    res.status(200).json({
      success: true,
      url: data.publicUrl,
    });
  } catch (err) {
    next(err);
  }
}
