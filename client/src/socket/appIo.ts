import { io, Socket } from "socket.io-client";

export let socket: Socket | null = null;

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:9876";

export const connectSocket = () => {
  if (!socket) {
    socket = io(apiUrl, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }
};

