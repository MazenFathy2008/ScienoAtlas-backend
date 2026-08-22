import sendMessage from "./messageHandler/sendMessage.js";
import changeRoom from "./rooms-controllers/changeRoom.js";
export default function messageHandler(socket, user) {
  console.log("BEFORE:", socket.eventNames());
  socket.on("message", (data) => {
    console.log("Insde message:", socket.eventNames());
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
  console.log("AFTER:", socket.eventNames());
}
