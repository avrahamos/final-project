import { Socket } from "socket.io";
import { IAddEventDto } from "../types/dto";
import { createNewEvent } from "../services/addEventService";

export const setUpCreateEvevt = (client:Socket)=>{
   
        client.on("addEvent" , async(newEvent:IAddEventDto,callback)=>{
            try {
                const event = await createNewEvent(newEvent)
                callback({
                  success: true,
                  data: event,
                });
            } catch (error) {
                callback({
                    succss:false,
                    data:error
                })
            }
        })
    
}