export default function setUpWepSocket(wss) {
  wss.on("connection", (socket) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          data: "Connected successfully",
        }),
      );
    }
  });
}
