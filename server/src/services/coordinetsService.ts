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
    console.log(countryName, "getDocumentsByCountry");
    const documents: ISummary[] = await Summary.aggregate([
      {
        $match: {
          country_txt: { $regex: countryName, $options: "i" }, 
          latitude: { $exists: true, $ne: null },
          longitude: { $exists: true, $ne: null },
          city: { $exists: true, $ne: null },
        },
      },
    ]);

    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw new Error("Failed to fetch documents");
  }
};

export const searchByCityPrefix = async (
  countryName: string,
  prefix: string
) => {
  try {
    console.log(countryName, "searchByCityPrefix");
    console.log(prefix, "searchByCityPrefix");

    // שליפת כל המסמכים במדינה
    const documents: ISummary[] = await getDocumentsByCountry(countryName);
    console.log(documents.slice(0, 20), "documents.slice(0,20)");

    const lowerCasePrefix = prefix.toLowerCase();

    // סינון מסמכים לפי קידומת העיר
    const matchingDocuments = documents.filter((doc) => {
      const city = doc.city?.toLowerCase();
      return city?.startsWith(lowerCasePrefix);
    });

    console.log(matchingDocuments, "Filtered Documents by Prefix");

    const uniqueCities = Array.from(
      new Set(matchingDocuments.map((doc) => doc.city?.toLowerCase()))
    );

    const results = uniqueCities.map((city) => ({
      city,
      documents: matchingDocuments.filter(
        (doc) => doc.city?.toLowerCase() === city
      ),
    }));

    console.log(results, "Final Search Results");
    return results;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to search cities by prefix");
  }
};