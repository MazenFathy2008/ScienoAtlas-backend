import Chat from "../../models/chat.model.js";
import getChat from "../getChat.js";
export default async function sendMessage(socket, payLoad, user) {
  const { message, chat } = payLoad;
  const chatInDB = await getChat(chat);
  console.log(chatInDB);
  const messageData = {
    sender: { email: user.email, name: user.name, id: user._id },
    content: message,
  };

  if (!chatInDB) {
    Chat.create({
      chat,
      messages: [messageData],
    });
    return;
  }
  chatInDB.messages.push(messageData);
  chatInDB.save();
}
