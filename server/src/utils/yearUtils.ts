import { Year } from "../models/year";

export const getYearDetails = async (yearNumber: number) => {
  try {
    const yearDetails = await Year.findOne({ year: yearNumber }).lean();
    console.log(yearDetails);
    if (!yearDetails) {
      throw new Error(`year ${yearNumber} not found`);
    }

    return yearDetails;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const getRecentYears = async (limit: number = 5) => {
  try {
    const recentYears = await Year.find()
      .sort({ year: -1 })
      .limit(limit)
      .lean();
    return recentYears;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const getYearsInRange = async (startYear: number, endYear: number) => {
  try {
    const yearsInRange = await Year.find({
      year: { $gte: startYear, $lte: endYear },
    })
      .sort({ year: 1 })
      .lean();
    return yearsInRange;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
