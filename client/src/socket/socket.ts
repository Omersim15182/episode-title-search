import { io } from "socket.io-client";

// בדיקה אם אנחנו בסביבת פיתוח או בנטליפיי
const SOCKET_URL =
  window.location.hostname === "localhost" ? "http://localhost:3501" : "/api"; // בנטליפיי אנחנו משתמשים ב-Proxy

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  path: "/socket.io", // נטליפיי יעביר את זה אוטומטית אם ה-redirect מוגדר נכון
});
