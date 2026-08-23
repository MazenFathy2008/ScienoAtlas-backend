import exitRoom from "./exitRoom.js";
import joinRoom from "./joinRooms.js";
import errorHandler from "../errorHandler.js";
const changeRoom = (socket, room) => {
  try {
    if (!room || typeof room !== "string") {
      const error = new Error();
      error.statusCode = 400;
      error.errorCode = "INVALID_ROOM";
      throw error;
    }
    if (socket.room === room) {
      return;
    }
    if (socket.room) {
      exitRoom(socket);
    }
    socket.room = room;
    joinRoom(socket);
  } catch (err) {
    errorHandler(socket, err);
  }
};
export default changeRoom;