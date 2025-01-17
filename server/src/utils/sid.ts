import fs from "fs";
import mongoose from "mongoose";
import { Summary } from "../models/summary";
import { AttackType } from "../models/atackType";
import { Country } from "../models/country";
import { Organization } from "../models/groupName";
import { Year } from "../models/year";
import { OrganizationImpact } from "../models/regionDamage";
import { Coordinates } from "../models/coordinates";

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
      city: doc.city || null,
      latitude: doc.latitude || null,
      longitude: doc.longitude || null,
      attacktype1_txt: doc.attacktype1_txt,
      gname: doc.gname || null,
      nkill: doc.nkill || 0,
      nwound: doc.nwound || 0,
      TotalAmount: (doc.nkill || 0) + (doc.nwound || 0),
      targtype1_txt: doc.targtype1_txt || null,
      target1: doc.target1 || null,
      weaptype1_txt: doc.weaptype1_txt || null,
      nperps: doc.nperps || 0,
      summary: doc.summary || null,
    }));

    await Summary.insertMany(validDocuments);
    console.log("data inserted");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

export const aggregateAndInsertAttackTypes = async () => {
  try {
    const aggregatedData = await Summary.aggregate([
      {
        $match: {
          attacktype1_txt: { $exists: true, $nin: [null, "Unknown"] },
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
  } catch (error) {
    console.error(error);
  }
};

export const aggregateAndInsertCountries = async () => {
  try {
    const aggregatedData = await Summary.aggregate([
      {
        $match: {
          country_txt: { $exists: true, $nin: [null, "Unknown"] },
        },
      },
      {
        $group: {
          _id: { country: "$country_txt", city: "$city", eventid: "$eventid" },
          casualties: { $sum: { $add: ["$nkill", "$nwound"] } },
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
        },
      },
      {
        $group: {
          _id: { country: "$_id.country", city: "$_id.city" },
          events: {
            $push: {
              latitude: "$latitude",
              longitude: "$longitude",
              casualties: "$casualties",
            },
          },
          cityTotalCasualties: { $sum: "$casualties" },
        },
      },
      {
        $group: {
          _id: "$_id.country",
          cities: {
            $push: {
              city: "$_id.city",
              events: "$events",
              sum: "$cityTotalCasualties",
            },
          },
          totalevg: { $sum: "$cityTotalCasualties" },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          cities: 1,
          totalevg: 1,
        },
      },
    ]);

    for (const data of aggregatedData) {
      await Country.updateOne(
        { country: data.country },
        { $set: data },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const aggregateOrganizations = async () => {
  try {
    const aggregatedData = await Summary.aggregate([
      {
        $match: {
          gname: { $exists: true, $nin: [null, "Unknown"] },
        },
      },
      {
        $group: {
          _id: { gname: "$gname", region: "$region_txt", year: "$iyear" },
          totalCasualties: { $sum: { $add: ["$nkill", "$nwound"] } },
          events: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { gname: "$_id.gname", region: "$_id.region" },
          years: {
            $push: {
              year: "$_id.year",
              events: "$events",
            },
          },
          casualties: { $sum: "$totalCasualties" },
        },
      },
      {
        $group: {
          _id: "$_id.gname",
          regions: {
            $push: {
              region: "$_id.region",
              casualties: "$casualties",
            },
          },
          years: { $push: "$years" },
          totalCasualties: { $sum: "$casualties" },
        },
      },
      {
        $project: {
          _id: 0,
          gname: "$_id",
          regions: 1,
          years: {
            $reduce: {
              input: "$years",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
          totalCasualties: 1,
        },
      },
    ]);

    for (const data of aggregatedData) {
      await Organization.updateOne(
        { gname: data.gname },
        { $set: data },
        { upsert: true }
      );
    }

    console.log("data aggregated successfully");
  } catch (error) {
    console.error(error);
  }
};

export const aggregateYearsWithEvents = async () => {
  try {
    const aggregatedData = await Summary.aggregate([
      {
        $match: {
          iyear: { $exists: true, $nin: [null, "Unknown"] },
          imonth: { $exists: true, $nin: [null, "Unknown"] },
        },
      },
      {
        $group: {
          _id: { year: "$iyear", month: "$imonth" },
          eventsNum: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.year",
          months: {
            $push: {
              month: "$_id.month",
              eventsNum: "$eventsNum",
            },
          },
          totalEvents: { $sum: "$eventsNum" },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id",
          months: 1,
          totalEvents: 1,
        },
      },
    ]);

    for (const data of aggregatedData) {
      await Year.updateOne(
        { year: data.year },
        { $set: data },
        { upsert: true }
      );
    }

    console.log("data aggregated successfully");
  } catch (error) {
    console.error(error);
  }
};

export const aggregateOrganizationImpact = async () => {
  try {
    const impacts = await Summary.aggregate([
      {
        $match: {
          gname: { $exists: true, $nin: [null, "Unknown"] },
        },
      },
      {
        $group: {
          _id: {
            gname: "$gname",
            region: "$region_txt",
            latitude: "$latitude",
            longitude: "$longitude",
          },
          casualties: { $sum: { $add: ["$nkill", "$nwound"] } },
        },
      },
      {
        $group: {
          _id: "$_id.gname",
          regions: {
            $push: {
              region: "$_id.region",
              casualties: "$casualties",
              latitude: "$_id.latitude",
              longitude: "$_id.longitude",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          gname: "$_id",
          regions: 1,
        },
      },
    ]);

    for (const impact of impacts) {
      await OrganizationImpact.updateOne(
        { gname: impact.gname },
        { $set: impact },
        { upsert: true }
      );
    }

    console.log("data aggregated successfully");
  } catch (error) {
    console.error(error);
  }
};

export const agregateCoordinates = async () => {
  try {
    const coordinatesData = await Summary.aggregate([
      {
        $match: {
          latitude: { $exists: true, $nin: [null, "Unknown"] },
          longitude: { $exists: true, $nin: [null, "Unknown"] },
        },
      },
      {
        $project: {
          _id: 0,
          latitude: 1,
          longitude: 1,
          city: "$city",
          country: "$country_txt",
          region: "$region_txt",
        },
      },
    ]);

    await Coordinates.insertMany(coordinatesData);

    console.log("data aggregated successfully");
  } catch (error) {
    console.error(error);
  }
};
