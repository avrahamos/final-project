import fs from "fs";
import mongoose from "mongoose";
import { Summary } from "../models/summary";
import { AttackType } from "../models/atackType";

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

export const aggregateAndInsertAttackTypes = async () => {
  try {
    const aggregatedData = await Summary.aggregate([
      {
        $match: {
          attacktype1_txt: { $exists: true, $ne: null }, 
        },
      },
      {
        $group: {
          _id: "$attacktype1_txt", 
          totalNKill: { $sum: "$nkill" }, 
          totalNWound: { $sum: "$nwound" }, 
        },
      },
      {
        $project: {
          _id: 0, 
          attacktype: "$_id", 
          nkill: "$totalNKill", 
          nwound: "$totalNWound", 
          totalAmount: { $add: ["$totalNKill", "$totalNWound"] }, 
        },
      },
    ]);

    for (const data of aggregatedData) {
      await AttackType.updateOne(
        { attacktype: data.attacktype }, 
        { $set: data }, 
        { upsert: true } 
      );
    }

    console.log("Data aggregated and inserted successfully!");
  } catch (error) {
    console.error("Error during aggregation and insertion:", error);
  }
};

