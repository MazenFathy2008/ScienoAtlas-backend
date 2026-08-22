import rooms from "../rooms.js";
import sendRoomChat from "../senders/sendRoomChat.js";
export default function joinRoom(socket) {
  const room = socket.room;
  rooms[room].add(socket);
  sendRoomChat(socket, room);
}
