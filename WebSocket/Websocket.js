import verifyToken from "../util/verfiy-token.js";
import messageHandler from "./handleMessage.js";
import exitRoom from "./rooms-controllers/exitRoom.js";
import errorHandler from "./errorHandler.js";
export default function setUpWepSocket(wss) {
  wss.on("connection", async (socket, request) => {
    try {
      const token = request.headers.cookie
        ?.split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.split("=")[1];
      if (!token) {
        const error = new Error();
        error.statusCode = 401;
        error.errorCode = "NOT_AUTHENTICATED";
        throw error;
      }
      const user = await verifyToken(token);
      socket.on("close", () => {
        exitRoom(socket);
      });
      messageHandler(socket, user);
    } catch (err) {
      errorHandler(socket, err);
      socket.close();
    }
  });
}