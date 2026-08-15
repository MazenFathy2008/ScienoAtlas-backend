import mongoose from "mongoose";
const paperScheme = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 50,
  },
  pdfUrl: {
    type: String,
    required: true,
    trim: true,
  },
  authors: {
    type: Array,
    required: true,
  },
  paperType: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
  },
  isVisable: {
    type: Boolean,
    required: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  publishingDate: {
    type: Date,
    required: true,
    trim: true,
  },
});
const Paper = mongoose.model("Paper", paperScheme);
export default Paper;
