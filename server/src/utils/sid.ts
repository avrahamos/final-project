import fs from "fs";
import mongoose from "mongoose";
import { Summary } from "../models/summary";

export const processJSONFile = async (filePath: string) => {
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const documents = JSON.parse(fileData);

    const validDocuments = documents.map((doc: any) => ({
      eventid: doc.eventid || 0,
      iyear: doc.iyear || 0,
      imonth: doc.imonth || null,
      iday: doc.iday || null,
      country_txt: doc.country_txt,
      region_txt: doc.region_txt,
      city: doc.city || "Unknown",
      latitude: doc.latitude || null,
      longitude: doc.longitude || null,
      attacktype1_txt: doc.attacktype1_txt,
      gname: doc.gname || "Unknown",
      nkill: doc.nkill || 0,
      nwound: doc.nwound || 0,
      TotalAmount: (doc.nkill || 0) + (doc.nwound || 0),
    }));

    await Summary.insertMany(validDocuments);
    console.log("Documents inserted successfully!");
  } catch (error) {
    console.error("Error processing the file:", error);
  } finally {
    mongoose.connection.close();
  }
};

