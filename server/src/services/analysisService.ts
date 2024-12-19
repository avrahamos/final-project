import { AttackType } from "../models/atackType";
import { Country } from "../models/country";
import { UserType } from "../types/yearType";
import {
  getRecentYears,
  getYearDetails,
  getYearsInRange,
} from "../utils/yearUtils";

export const deadliestAttackTypesService = async () => {
  try {
    const attackTypes = await AttackType.find()
      .sort({ totalAmount: -1 })
      .select("attacktype totalAmount nkill nwound")
      .lean();

    return attackTypes;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch");
  }
};

export const highestCasualtyRegionsService = async () => {
  try {
    const countries = await Country.aggregate([
      {
        $match: {
          totalevg: { $exists: true, $gt: 0 },
        },
      },
      {
        $sort: {
          totalevg: -1,
        },
      },
      {
        $project: {
          _id: 0,
          country: 1,
          totalevg: 1,
        },
      },
    ]).exec();

    return countries;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch");
  }
};

export const getCountryDetailsService = async (countryName: string) => {
  try {
    const countryDetails = await Country.findOne({ country: countryName })
      .populate("cities.events")
      .lean();

    if (!countryDetails) {
      throw new Error(`Country '${countryName}' not found`);
    }

    return countryDetails;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch");
  }
};

export const incidentTrendsService = async (
  type: UserType,
  options: {
    year?: number;
    startYear?: number;
    endYear?: number;
    limit?: number;
  }
) => {
  try {
    switch (type) {
      case "singleYear":
        if (!options.year) {
          throw new Error("missing 'year' parameter for singleYear request");
        }
        return await getYearDetails(options.year);

      case "range":
        if (!options.startYear || !options.endYear) {
          throw new Error(
            "missing 'startYear' or 'endYear' parameter for range request"
          );
        }
        return await getYearsInRange(options.startYear, options.endYear);

      case "recent":
        const limit = options.limit || 5;
        return await getRecentYears(limit);

      default:
        throw new Error("invalid type");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch");
  }
};
