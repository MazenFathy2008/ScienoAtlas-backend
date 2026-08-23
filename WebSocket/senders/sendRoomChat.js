import getChat from "../getChat.js";
import errorHandler from "../errorHandler.js";
export default async function sendRoomChat(socket, chat) {
  try {
    const data = await getChat(chat);
    socket.send(
      JSON.stringify({
        type: "GET-CHAT",
        payLoad: { data },
      }),
    );
  } catch (err) {
    errorHandler(socket, err);
  }
}
