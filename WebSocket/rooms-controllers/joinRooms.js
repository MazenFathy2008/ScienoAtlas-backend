import rooms from "../rooms.js";
import sendRoomChat from "../senders/sendRoomChat.js";
import sendRoomNum from "../senders/sendRoomNum.js";
import errorHandler from "../errorHandler.js";
export default function joinRoom(socket) {
  try {
    const room = socket.room;
    if (!room || !rooms[room]) {
      const error = new Error();
      error.statusCode = 404;
      error.errorCode = "ROOM_NOT_FOUND";
      throw error;
    }
    rooms[room].add(socket);
    sendRoomNum(room);
    sendRoomChat(socket, room);
  } catch (err) {
    errorHandler(socket, err);
  }
}

