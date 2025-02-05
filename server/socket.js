import { Server } from "socket.io";

const users = new Map();

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("socket id", socket.id);

    socket.on("register", (userId) => {
      users.set(userId, socket.id);
      console.log("users", users);
    });

    socket.on("private message", (msg) => {
      const destSocket = users.get(msg.destination_id);
      if (destSocket) {
        socket.to(destSocket).emit("private message callback", msg);
      }
    });
    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });
};

export default socketServer;
