import { Organization } from "../models/groupName";
import { OrganizationImpact } from "../models/regionDamage";

export const groupsByYearService = async (year: number) => {
  try {
    const organizations = await Organization.aggregate([
      {
        $unwind: "$years", 
      },
      {
        $match: {
          "years.year": year, 
        },
      },
      {
        $group: {
          _id: "$gname", 
          totalEvents: { $sum: "$years.events" }, 
        },
      },
      {
        $project: {
          _id: 0, 
          gname: "$_id", 
          totalEvents: 1, 
        },
      },
      {
        $sort: {
          totalEvents: -1, 
        },
      },
    ]);

    return organizations;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch groups by year.");
  }
};

export const topGroupsService = async (regionName: string) => {
  try {
    const organizations = await Organization.aggregate([
      {
        $match: {
          "regions.region": regionName.trim(),
        },
      },
      {
        $project: {
          gname: 1,
          totalEvents: {
            $sum: "$years.events",
          },
          regions: {
            $filter: {
              input: "$regions",
              as: "region",
              cond: { $eq: ["$$region.region", regionName.trim()] },
            },
          },
        },
      },
      {
        $sort: {
          totalEvents: -1,
        },
      },
    ]);

    return organizations;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch top groups");
  }
};

export const deadliestRegionsService = async (organizationName: string) => {
  try {
    const regions = await OrganizationImpact.aggregate([
      {
        $match: {
          gname: organizationName.trim(),
        },
      },
      {
        $unwind: "$regions",
      },
      {
        $sort: { "regions.casualties": -1 },
      },
      {
        $project: {
          _id: 0,
          region: "$regions.region",
          casualties: "$regions.casualties",
          latitude: "$regions.latitude",
          longitude: "$regions.longitude",
        },
      },
    ]);

    return regions;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch");
  }
};

export const getRegionsListService = async () => {
  try {
    const regions = await Organization.aggregate([
      {
        $unwind: "$regions",
      },
      {
        $group: {
          _id: "$regions.region",
          casualties: { $sum: "$regions.casualties" },
        },
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          casualties: 1,
        },
      },
      {
        $sort: { casualties: -1 },
      },
    ]);
    return regions;
  } catch (error) {
    console.error("Error fetching regions list:", error);
    throw new Error("Unable to fetch regions list.");
  }
};

export const getAllOrganizationsService = async (): Promise<string[]> => {
  try {
    const organizationNames = await Organization.distinct("gname", {
      gname: { $nin: ["Unknown", null] },
    });

    return organizationNames;
  } catch (error) {
    console.error(error);
    throw new Error("failed to fetch");
  }
};