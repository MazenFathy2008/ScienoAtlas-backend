import Contact from "../models/contactUs.model.js";
export default async function contactUsController(req, res, next) {
  try {
    const { email, name, subject, message } = req.body;
    await Contact.create({
      email,
      name,
      subject: subject?.trim() || "none",
      message,
    });
    res.status(201).json({
      message: "CONTACT_SUBMITTED",
    });
  } catch (err) {
    next(err);
  }
}
