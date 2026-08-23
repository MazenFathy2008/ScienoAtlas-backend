import sendMessage from "./senders/sendMessage.js";
import changeRoom from "./rooms-controllers/changeRoom.js";
import errorHandler from "./errorHandler.js";
export default function messageHandler(socket, user) {
  socket.on("message", (data) => {
    try {
      data = JSON.parse(data);
      const { payLoad, type } = data;
      if (!type) {
        const error = new Error();
        error.statusCode = 400;
        error.errorCode = "INVALID_MESSAGE";
        throw error;
      }
      if (!payLoad) {
        const error = new Error();
        error.statusCode = 400;
        error.errorCode = "INVALID_PAYLOAD";
        throw error;
      }
      switch (type) {
        case "send-message":
          sendMessage(socket, payLoad, user);
          return;
        case "change-room":
          changeRoom(socket, payLoad.room);
          return;
        default: {
          const error = new Error();
          error.statusCode = 400;
          error.errorCode = "INVALID_MESSAGE";
          throw error;
        }
      }
    } catch (err) {
      errorHandler(socket, err);
    }
  });
}
