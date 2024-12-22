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


export const searchCoordinates = async (query: {
  city?: string;
  country?: string;
  region?: string;
}) => {
  try {
    const filter: any = {};
    if (query.city) filter.city = { $regex: query.city, $options: "i" };
    if (query.country)
      filter.country = { $regex: query.country, $options: "i" };
    if (query.region) filter.region = { $regex: query.region, $options: "i" };

    return await Coordinates.find(filter).limit(20); 
  } catch (error) {
    console.error( error);
    throw new Error("failed to search");
  }
};
