import { ISummary, Summary } from "../models/summary";
import { IUpdateEventDto } from "../types/dto";
import { deleteRelatedDocuments, updateAllCollections } from "../utils/crud";

export const updateSummaryById = async (
  id: string,
  updateData: IUpdateEventDto
): Promise<ISummary | null> => {
  try {
    const summary = await Summary.findById(id).exec();
    if (!summary) {
      throw new Error(`Summary with ID ${id} not found.`);
    }
    const isUpdate = await updateAllCollections(summary);
    if (!isUpdate) {
      console.error("filde update all collections");
      return null;
    }

    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    Object.assign(summary, fieldsToUpdate);

    const updatedSummary = await summary.save();
    return updatedSummary;
  } catch (error) {
    console.error("Error updating summary:", error);
    throw new Error("Could not update summary.");
  }
};

export const DeleteSummaryById = async (id: string) => {
  try {
    const summary = await Summary.findByIdAndDelete(id).exec();
    if (summary) {
      const result = await deleteRelatedDocuments(summary);
      console.log("Summary and all deleted:", result);
    } else {
      console.log("Summary not found");
    }
    return summary;
  } catch (error) {
    console.error(error);
    return;
  }
};
