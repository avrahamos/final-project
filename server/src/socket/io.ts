import { Server, Socket } from "socket.io";
import {
  setupCoordinatesEvents,
  setupSearchCities,
  setupSearchEvents,
} from "./coordinatesHandler";
import { SetupDelelteEvent, setUpUpdateEvent } from "./updatedSummary";
import { setUpCreateEvevt } from "./createEventIo";

export const setupSocketEvents = (io: Server) => {
  io.on("connection", (client: Socket) => {
    console.log(`New client connected: ${client.id}`);

    setupCoordinatesEvents(client);
    setupSearchEvents(client);
    setUpCreateEvevt(io, client);
    setUpUpdateEvent(client);
    setupSearchCities(client);
    SetupDelelteEvent(client);

    client.on("disconnect", () => {
      console.log(`Client disconnected: ${client.id}`);
    });
  });
};
