import Chat from "../models/chat.model.js";

export default async function getChat(chatTitle) {
  const chat = await Chat.findOne({
    chat: chatTitle,
  });
  if (!chat) {
    return;
  }
  return chat;
}
