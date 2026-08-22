import sendMessage from "./messageHandler/sendMessage.js";

export default function messageHandler(socket, user) {
  socket.on("message", (data) => {
    data = JSON.parse(data);
    const { payLoad, type } = data;
    switch (type) {
      case "send-message":
        sendMessage(socket, payLoad, user);
    }
  });
}
