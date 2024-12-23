import { Server, Socket } from "socket.io";
import {
  setupCoordinatesEvents,
  setupSearchEvents,
} from "./coordinatesHandler";
import { setUpCreateEvevt } from "./createEventIo";

export const setupSocketEvents = (io: Server) => {
  io.on("connection", (client: Socket) => {
    console.log(`New client connected: ${client.id}`);

    setupCoordinatesEvents(client);
    setupSearchEvents(client);
    setUpCreateEvevt(client);
    client.on("disconnect", () => {
      console.log(`Client disconnected: ${client.id}`);
    });
  });
};
