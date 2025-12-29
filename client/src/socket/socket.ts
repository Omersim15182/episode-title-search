import { io } from "socket.io-client";

const SOCKET_URL =
  window.location.hostname === "localhost" ? "http://localhost:3501" : "/"; // בנטליפיי אנחנו פונים לכתובת האתר עצמו

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  path: "/api/socket.io", // חייב להתאים לשורה הראשונה ב-redirects
  transports: ["polling"], // חשוב: בנטליפיי חינמי, WebSockets לעיתים נחסמים, polling עובד תמיד
});
