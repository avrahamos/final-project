import { Server, Socket } from "socket.io";
import { getAllCoordinates, searchCountries } from "../services/coordinetsService";


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


    client.on("searchCountries", async (query) => {
      try {
        const results = await searchCountries(query);
        client.emit("searchResults", results);
      } catch (error) {
        console.error(error);
        client.emit("error", "failed to search coordinates");
      }
    });
    client.on("disconnect", () => {
      console.log(`Client disconnected: ${client.id}`);
    });
  });
};
