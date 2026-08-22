import Chat from "../models/chat.model.js";

export default async function getChat(committeeTitle) {
  const chat = await Chat.findOne({
    committee: committeeTitle,
  });
  if (!chat) {
    return;
  }
  return chat;
}
