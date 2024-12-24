import { IUpdateEventDto } from "../types/socket";
import { socket } from "./appIo";

export const updateSummary = (
  id: string,
  updateData: IUpdateEventDto,
  callback: (response: {
    success: boolean;
    data?: any;
    message?: string;
  }) => void
) => {
  if (socket) {
    socket.emit("updateSummary", { id, updateData }, callback);
  } else {
    console.error("Socket is not connected.");
  }
};

export const deleteEvent = (
  id: string,
  callback: (response: {
    success: boolean;
    data?: any;
    message?: string;
  }) => void
) => {
  if (socket) {
    socket.emit("delelteEvent", id, callback);
  } else {
    console.error("Socket is not connected");
  }
};



