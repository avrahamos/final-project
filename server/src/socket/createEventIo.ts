import { Socket, Server } from "socket.io";
import { IAddEventDto } from "../types/dto";
import { createNewEvent } from "../services/addEventService";

export const setUpCreateEvevt = (io: Server, client: Socket) => {
  client.on("addEvent", async (newEvent: IAddEventDto, callback) => {
    try {
      const event = await createNewEvent(newEvent);

      callback({
        success: true,
        data: event,
      });

      io.emit("eventAdded", event);
    } catch (error) {
      console.error("Error creating event:", error);
      callback({
        success: false,
        error: error,
      });
    }
  });
};
