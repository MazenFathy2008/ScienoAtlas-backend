import verifyToken from "../util/verfiy-token.js";
import { WebSocket } from "ws";

export default function setUpWepSocket(wss) {
  wss.on("connection", (socket, request) => {
    try {
      const token = request.headers.cookie
        ?.split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.split("=")[1];
      if (!token) {
        socket.close();
        return;
      }
      const user = verifyToken(token);
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            data: "Connected successfully",
          }),
        );
      }
      socket.on("message", (data) => {
        data = JSON.parse(data);
        const { payload, type } = data;
        console.log(data);
      });
    } catch (err) {
      socket.close();
      console.log(err);
    }
  });
}
