import { Server, Socket } from "socket.io";
import { setupCoordinatesEvents, setupSearchEvents } from "./coordinatesHandler";


export const setupSocketEvents = (io: Server) => {
  io.on("connection", (client: Socket) => {
    console.log(`New client connected: ${client.id}`);

     setupCoordinatesEvents(client);
     setupSearchEvents(client);

    client.on("disconnect", () => {
      console.log(`Client disconnected: ${client.id}`);
    });
  });
};
