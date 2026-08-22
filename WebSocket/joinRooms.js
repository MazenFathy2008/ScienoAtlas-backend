import rooms from "./rooms.js";
import sendRoomChat from "./sendRoomChat.js";
export default function joinRoom(socket) {
  const room = socket.room;
  rooms[room].add(socket);
  console.log(rooms);
  sendRoomChat(socket, room);
}
