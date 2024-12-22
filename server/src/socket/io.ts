import { Server, Socket } from "socket.io";
import { getAllCoordinates, searchCoordinates } from "../services/readLocationService";


export const setupSocketEvents = (io: Server) => {
  io.on("connection", (client: Socket) => {
    console.log(`New client connected: ${client.id}`);

    client.on("getAllCoordinates", async () => {
      try {
        const coordinates = await getAllCoordinates(); 
        client.emit("coordinatesList", coordinates); 
      } catch (error) {
        console.error( error);
        client.emit("error", "failed to fetch coordinates");
      }
    });


    client.on("searchCoordinates", async (query) => {
      try {
        const results = await searchCoordinates(query); 
        client.emit("searchResults", results); 
      } catch (error) {
        console.error( error);
        client.emit("error", "failed to search coordinates");
      }
    });
    client.on("disconnect", () => {
      console.log(`Client disconnected: ${client.id}`);
    });
  });
};
