import { io } from "socket.io-client";

export const socket = io("http://localhost:3501", {
  withCredentials: true,
});
