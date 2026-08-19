import mongoose from "mongoose";

const paperSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 5,
  },

  abstract: {
    type: String,
    required: true,
    trim: true,
    minLength: 50,
  },

  authors: {
    type: Array,
    required: true,
  },

  type: {
    type: String,
    required: true,
    trim: true,
    enum: ["paper", "qrticle", "pdf"],
  },

  cat: {
    type: String,
    required: true,
    trim: true,
    enum: ["Research Paper", "Article", "PDF"],
  },

  tags: {
    type: Array,
    required: true,
  },

  file: {
    type: String,
    required: true,
    trim: true,
  },

  state: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
    required: true,
  },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Paper = mongoose.model("Paper", paperSchema);

export default Paper;
