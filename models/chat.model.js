import mongoose from "mongoose";
const chatSceme = mongoose.Schema({
  subject: {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  messages: [
    {
      sender: {
        id: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
      content: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
const Chat = mongoose.model("Chat", chatSceme);
export default Chat;
