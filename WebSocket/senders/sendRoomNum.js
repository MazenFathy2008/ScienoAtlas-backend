import rooms from "../rooms.js";
export default function sendRoomNum(room) {
  rooms[room].forEach((socket) => {
    socket.send(
      JSON.stringify({
        type: "MEMBER-JOINED",
        payLoad: {
          chat: room,
          number: rooms[room].size,
        },
      }),
    );
  });
}
