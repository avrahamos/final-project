import { Coordinates } from "../models/coordinates";
import { ISummary, Summary } from "../models/summary";

export const getAllCoordinates = async () => {
  try {
    const coordinates = await Coordinates.aggregate([
      {
        $group: {
          _id: "$country",
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          latitude: 1,
          longitude: 1,
        },
      },
    ]);

    return coordinates;
  } catch (error) {
    console.error(error);
    throw new Error("failed to fetch");
  }
};

export const searchCountries = async (query: { country?: string }) => {
  try {
    const match: any = {};
    if (query.country) match.country = { $regex: query.country, $options: "i" };

    const results = await Coordinates.aggregate([
      { $match: match },
      {
        $group: {
          _id: { country: "$country", city: "$city" },
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
        },
      },
      {
        $group: {
          _id: "$_id.country",
          cities: {
            $push: {
              city: "$_id.city",
              latitude: "$latitude",
              longitude: "$longitude",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id", 
          cities: 1, 
        },
      },
      { $limit: 50 }, 
    ]);

    return results;
  } catch (error) {
    console.error(error);
    throw new Error("failed to search");
  }
};
export const getDocumentsByCountry = async (countryName: string) => {
  try {
    const documents :ISummary[]= await Summary.aggregate([
      {
        $match: {
          country_txt: { countryName, $options: "i" },
          latitude: { $exists: true, $ne: null },
          longitude: { $exists: true, $ne: null },
          city: { $exists: true, $ne: null  },
        },
      },
    ]);

    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw new Error("Failed to fetch documents");
  }
};

export const searchByCityPrefix = async (countryName:string, prefix: string) => {
  try {
    const documents: ISummary[] = await getDocumentsByCountry(countryName);
    
    const lowerCasePrefix = prefix.toLowerCase();
    const matchingDocuments = documents.filter((doc) => {
      const city = doc.city?.toLowerCase();
      return city?.startsWith(lowerCasePrefix);
    });

    return matchingDocuments;
  } catch (error) {
    console.error(error);
    throw new Error("failed search");
  }
};
