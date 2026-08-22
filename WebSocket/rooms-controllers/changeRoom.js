import exitRoom from "./exitRoom.js";
import joinRoom from "./joinRooms.js";

const changeRoom = (socket, room) => {
  if (socket.room) {
    exitRoom(socket);   
  }
  socket.room = room;
  joinRoom(socket);
};
export default changeRoom;
