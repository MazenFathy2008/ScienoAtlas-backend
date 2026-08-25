import mongoose from "mongoose";
const contactUsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["waiting", "resolved"],
      default: "waiting",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Contact = mongoose.model("Contact", contactUsSchema);
export default Contact;
