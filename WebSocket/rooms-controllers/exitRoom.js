import rooms from "../rooms.js";
import sendRoomNum from "../senders/sendRoomNum.js";
import errorHandler from "../errorHandler.js";
export default function exitRoom(socket) {
  try {
    const room = socket.room;
    const roomMembers = rooms[room];
    if (!roomMembers) {
      return;
    }
    roomMembers.delete(socket);
    sendRoomNum(room);
  } catch (err) {
    errorHandler(socket, err);
  }
}
