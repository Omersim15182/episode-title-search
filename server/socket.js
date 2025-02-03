import { Server } from "socket.io";

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("private message", ({ recipientId, message }) => {
      console.log("mess", message);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

export default socketServer;
