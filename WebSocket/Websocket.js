import verifyToken from "../util/verfiy-token.js";
import messageHandler from "./handleMessage.js";
export default function setUpWepSocket(wss) {
  wss.on("connection", async (socket, request) => {
    try {
      const token = request.headers.cookie
        ?.split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.split("=")[1];
      if (!token) {
        socket.close();
        return;
      }
      const user = await verifyToken(token);
      messageHandler(socket, user);
    } catch (err) {
      socket.close();
      console.log(err);
    }
  });
}
