import { Socket } from "socket.io";
import { getAllCoordinates, searchCountries } from "../services/coordinetsService";

export const setupCoordinatesEvents = (client: Socket) => {
  client.on("getAllCoordinates", async () => {
    try {
      const coordinates = await getAllCoordinates();
      client.emit("coordinatesList", coordinates);
    } catch (error) {
      console.error(error);
      client.emit("error", "failed to fetch");
    }
  });
};

export const setupSearchEvents = (client: Socket) => {
  client.on("searchCountries", async (query) => {
    try {
      const results = await searchCountries(query);
      client.emit("searchResults", results);
    } catch (error) {
      console.error(error);
      client.emit("error", "failed to search coordinates");
    }
  });
};