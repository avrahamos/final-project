import { Server, Socket } from "socket.io";
import {
  setupCoordinatesEvents,
  setupSearchCities,
  setupSearchEvents,
} from "./coordinatesHandler";
import { setUpCreateEvevt } from "./createEventIo";
import { setUpUpdateEvent } from "./updatedSummary";

export const setupSocketEvents = (io: Server) => {
  io.on("connection", (client: Socket) => {
    console.log(`New client connected: ${client.id}`);

    setupCoordinatesEvents(client);
    setupSearchEvents(client);
    setUpCreateEvevt(client);
    setUpUpdateEvent(client)
    setupSearchCities(client)

    client.on("disconnect", () => {
      console.log(`Client disconnected: ${client.id}`);
    });
  });
};
