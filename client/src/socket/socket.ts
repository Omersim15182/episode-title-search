import { io } from "socket.io-client";

const SOCKET_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3501"
    : window.location.origin;

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  path: "/api/socket.io",
  transports: ["polling"],
});
