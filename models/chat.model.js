import mongoose from "mongoose";
const chatSceme = mongoose.Schema({
  chat: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    enum: ["physics", "chemistry", "biology", "astronomy", "math_cs"],
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
