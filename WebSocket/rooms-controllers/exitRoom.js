import rooms from "../rooms.js";
import sendRoomNum from "../senders/sendRoomNum.js";
export default function exitRoom(socket) {
  const room = socket.room;
  const roomMembers = rooms[room];
  if (!roomMembers) {
    return;
  }
  roomMembers.delete(socket);
  sendRoomNum(room);
}
