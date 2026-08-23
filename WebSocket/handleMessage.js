import sendMessage from "./senders/sendMessage.js";
import changeRoom from "./rooms-controllers/changeRoom.js";
export default function messageHandler(socket, user) {
  socket.on("message", (data) => {
    data = JSON.parse(data);
    const { payLoad, type } = data;
    switch (type) {
      case "send-message":
        sendMessage(socket, payLoad, user);
        return;

      case "change-room":
        changeRoom(socket, payLoad.room);
        return;
    }
  });
}
