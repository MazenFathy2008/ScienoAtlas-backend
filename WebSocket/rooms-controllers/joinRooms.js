import rooms from "../rooms.js";
import sendRoomChat from "../senders/sendRoomChat.js";
import sendRoomNum from "../senders/sendRoomNum.js";
export default function joinRoom(socket) {
  const room = socket.room;
  rooms[room].add(socket);
  sendRoomNum(room)
  sendRoomChat(socket, room); 
}
