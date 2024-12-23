import { Socket } from "socket.io";
import { IUpdateEventDto } from "../types/dto";
import { updateSummaryById } from "../services/updateEventService";

export const setUpUpdateEvent = (client: Socket) => {
  client.on(
    "updateSummary",
    async (data: { id: string; updateData: IUpdateEventDto }, callback) => {
      try {
        const { id, updateData } = data;

        if (!id || !updateData || Object.keys(updateData).length === 0) {
          return callback({
            success: false,
            message: "invalid input.",
          });
        }

        const updatedSummary = await updateSummaryById(id, updateData);

        if (!updatedSummary) {
          return callback({
            success: false,
            message: "summary not found",
          });
        }

        callback({
          success: true,
          data: updatedSummary,
        });
      } catch (error) {
        console.error( error);
        callback({
          success: false,
          message: "not update summar.",
          error: error,
        });
      }
    }
  );
};
