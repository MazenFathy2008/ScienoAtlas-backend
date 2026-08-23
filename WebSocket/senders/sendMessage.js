import Chat from "../../models/chat.model.js";
import getChat from "../getChat.js";
import rooms from "../rooms.js";
import errorHandler from "../errorHandler.js";
export default async function sendMessage(socket, payLoad, user) {
  try {
    const { message, chat } = payLoad;
    const chatInDB = await getChat(chat);
    const messageData = {
      sender: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
      content: message,
    };
    let savedMessage;
    if (!chatInDB) {
      const newChat = await Chat.create({
        chat,
        messages: [messageData],
      });
      savedMessage = newChat.messages[0];
    } else {
      chatInDB.messages.push(messageData);
      await chatInDB.save();
      savedMessage = chatInDB.messages.at(-1);
    }
    const room = socket.room;
    rooms[room].forEach((socketInsideRoom) => {
      socketInsideRoom.send(
        JSON.stringify({
          type: "SEND-MESSAGE",
          payLoad: {
            data: {
              chat,
              message: savedMessage,
            },
          },
        }),
      );
    });
  } catch (err) {
    errorHandler(socket, err);
  }
}