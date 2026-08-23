import getChat from "../getChat.js";
export default async function sendRoomChat(socket, chat) {
  const data = await getChat(chat);
  socket.send(
    JSON.stringify({
      type: "GET-CHAT",
      payLoad: { data },
    }),
  );
}
