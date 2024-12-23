import { socket } from "./appIo";
import { EVENTS } from "./events";

export const fetchAllCoordinates = () => {
  if (socket) {
    socket.emit(EVENTS.Get_All_Coordinates);
  }
};

export const onCoordinatesList = (callback: (data: any) => void) => {
  if (socket) {
    socket.on("coordinatesList", (data) => {

      callback(data);
    });
  }
};

export const searchCountries = (query: { country?: string }) => {
  if (socket) {
    socket.emit(EVENTS.search_Countries, query);
  }
};

export const onSearchResults = (callback: (data: any) => void) => {
  if (socket) {
    socket.on("searchResults", (data) => {
      console.log("Received search results:", data.slice(0, 20));
      callback(data);
    });
  }
};

export const disconnectListeners = (): void => {
  if (socket) {
    socket.off(EVENTS.Get_All_Coordinates);
    socket.off(EVENTS.search_Countries);
  }
};
