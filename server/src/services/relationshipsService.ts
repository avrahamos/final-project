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
        $project: {
          gname: 1, 
          events: "$years.events", 
        },
      },
      {
        $group: {
          _id: "$gname", 
          totalEvents: { $sum: "$events" }, 
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
    console.error( error);
    throw new Error("Could not fetch");
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
   console.error( error);
   throw new Error("Could not fetch");
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
    console.error( error);
    throw new Error("Could not fetch");
  }
};