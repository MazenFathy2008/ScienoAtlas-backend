import verifyToken from "../util/verfiy-token.js";
import { WebSocket } from "ws";
import messageHandler from "./handleMessage.js";
import sedRoomChat from "./sendRoomChat.js";
import joinRoom from "./rooms-controllers/joinRooms.js";
import exitRoom from "./rooms-controllers/exitRoom.js";

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
      if (socket.readyState === WebSocket.OPEN) {
        socket.room = "physics";
        joinRoom(socket);
      }
      socket.on("close", () => {
        exitRoom(socket);
      });
      messageHandler(socket, user);
    } catch (err) {
      socket.close();
      console.log(err);
    }
  });
}
