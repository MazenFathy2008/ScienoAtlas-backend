import rooms from "../rooms.js";
import sendRoomNum from "../senders/sendRoomNum.js";
export default function exitRoom(socket) {
  const room = socket.room;
  rooms[room].delete(socket);
  sendRoomNum(room)
}
