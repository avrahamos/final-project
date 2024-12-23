import { Coordinates } from "../models/coordinates";

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
