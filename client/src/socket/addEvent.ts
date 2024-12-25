import { IAddEventDto } from "../types/addNewEvent";
import { socket } from "./appIo";

export const onEventAdded = (callback: (data: any) => void) => {
  if (socket) {
    socket.on("eventAdded", (data) => {
      callback(data);
    });
  }
};

export const emitAddEvent = (
  eventData: IAddEventDto,
  callback: (response: any) => void
) => {
  if (socket) {
    socket.emit("addEvent", eventData, (response: any) => {
      callback(response);
    });
  }
};
