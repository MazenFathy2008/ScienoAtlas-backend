import rooms from "../rooms.js";
export default function exitRoom(socket) {
  const room = socket.room;
  rooms[room].delete(socket);
}
