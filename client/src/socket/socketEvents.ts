import { socket } from "./socket";

export const setupSocketListeners = (onMessage: (data: any) => void) => {
  socket.on("message", onMessage);

  return () => {
    socket.off("message", onMessage);
  };
};
