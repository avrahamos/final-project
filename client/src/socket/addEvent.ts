import { IAddEventDto } from "../types/addNewEvent";
import { socket } from "./appIo";
import { EVENTS } from "./events";

export const emitAddEvent = (eventData: IAddEventDto): Promise<any> => {
  return new Promise((resolve, reject) => {
     if (socket)
       socket.emit(EVENTS.Add_Event, eventData, (response: any) => {
         if (response.success) {
           resolve(response.data);
         } else {
           reject(response.error);
         }
       });
  });
};