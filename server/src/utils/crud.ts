import { AttackType } from "../models/atackType";
import { Coordinates } from "../models/coordinates";
import { Country } from "../models/country";
import { Organization } from "../models/groupName";
import { OrganizationImpact } from "../models/regionDamage";
import { ISummary } from "../models/summary";
import { Year } from "../models/year";

 const updateAttackType = async (summary: ISummary) => {
  const { attacktype1_txt, nkill, nwound, TotalAmount } = summary;

  await AttackType.updateOne(
    { attacktype: attacktype1_txt },
    {
      $inc: {
        nkill: nkill || 0,
        nwound: nwound || 0,
        totalAmount: TotalAmount || 0,
      },
    },
    { upsert: true }
  );
};

 const updateCoordinates = async (summary: ISummary) => {
  const { latitude, longitude, city, country_txt, region_txt } = summary;

  await Coordinates.updateOne(
    { latitude, longitude },
    {
      $set: { city, country: country_txt, region: region_txt },
    },
    { upsert: true }
  );
};

 const createCountryAndCity = async (summary: ISummary) => {
  const { country_txt, city, latitude, longitude, nkill, nwound } = summary;

  const casualties = (nkill || 0) + (nwound || 0);

  await Country.create({
    country: country_txt,
    cities: [
      {
        city,
        sum: casualties,
        events: [
          {
            latitude,
            longitude,
            casualties,
          },
        ],
      },
    ],
    totalevg: casualties,
  });
};

 const updateCityInCountry = async (summary: ISummary) => {
  const { country_txt, city, latitude, longitude, nkill, nwound } = summary;

  const casualties = (nkill || 0) + (nwound || 0);

  await Country.updateOne(
    { country: country_txt, "cities.city": city },
    {
      $inc: {
        "cities.$.sum": casualties,
        totalevg: casualties,
      },
      $push: {
        "cities.$.events": {
          latitude,
          longitude,
          casualties,
        },
      },
    },
    { upsert: false } 
  );
};

 const addCityToCountry = async (summary: ISummary) => {
  const { country_txt, city, latitude, longitude, nkill, nwound } = summary;

  const casualties = (nkill || 0) + (nwound || 0);

  await Country.updateOne(
    { country: country_txt },
    {
      $push: {
        cities: {
          city,
          sum: casualties,
          events: [
            {
              latitude,
              longitude,
              casualties,
            },
          ],
        },
      },
      $inc: { totalevg: casualties }, 
    }
  );
};


 const handleCountryAndCity = async (summary: ISummary) => {
  const { country_txt, city } = summary;

  const country = await Country.findOne({ country: country_txt });

  if (country) {
    const cityExists = country.cities.some((c) => c.city === city);

    if (cityExists) {

      await updateCityInCountry(summary);
    } else {
    
      await addCityToCountry(summary);
    }
  } else {

    await createCountryAndCity(summary);
  }
};

 const addRegionToOrganization = async (summary: ISummary) => {
  const { gname, region_txt, TotalAmount } = summary;

  const casualtiesCount = TotalAmount || 0;

  const organization = await Organization.findOne({ gname });

  const regionExists = organization?.regions.some(
    (region ) => region.region === region_txt
  );

  if (!regionExists) {
    await Organization.updateOne(
      { gname },
      {
        $push: {
          regions: { region: region_txt, casualties: casualtiesCount },
        },
      }
    );
  }
};

 const updateOrganization = async (summary: ISummary) => {
  const { gname, TotalAmount, iyear } = summary;

  const casualtiesCount = TotalAmount || 0; 

  await Organization.updateOne(
    { gname },
    {
      $inc: { totalCasualties: casualtiesCount }, 
      $addToSet: {
        years: {
          year: iyear,
          events: 1, 
        },
      },
    },
    { upsert: true } 
  );

  await addRegionToOrganization(summary);
};

 const addRegionToImpact = async (summary: ISummary) => {
  const { gname, region_txt, TotalAmount, latitude, longitude } = summary;

  const casualtiesCount = TotalAmount || 0; 

  const organization = await OrganizationImpact.findOne({ gname });

  const regionExists = organization?.regions.some(
    (region) => region.region === region_txt
  );

  if (!regionExists) {
    await OrganizationImpact.updateOne(
      { gname },
      {
        $push: {
          regions: {
            region: region_txt,
            casualties: casualtiesCount,
            latitude,
            longitude,
          },
        },
      },
      { upsert: true } 
    );
  }
};

const updateOrganizationImpact = async (summary: ISummary) => {
  const { gname, region_txt, TotalAmount, latitude, longitude } = summary;

  const casualtiesCount = TotalAmount || 0; 

  await OrganizationImpact.updateOne(
    { gname, "regions.region": region_txt },
    {
      $inc: { "regions.$.casualties": casualtiesCount }, 
    },
    { upsert: false } 
  );

  await addRegionToImpact(summary);
};

const isValidDate = (year: number, month: number, day: number): boolean => {

    const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const isFutureDate = (year: number, month: number, day: number): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentDay = currentDate.getDate();

  return (
    year > currentYear ||
    (year === currentYear && month > currentMonth) ||
    (year === currentYear && month === currentMonth && day > currentDay)
  );
};

 const updateMonth = async (summary: ISummary) => {
  const { iyear, imonth } = summary;

  await Year.updateOne(
    { year: iyear, "months.month": imonth },
    {
      $inc: {
        "months.$.eventsNum": 1, 
        totalEvents: 1, 
      },
    }
  );
};

 const addMonthToYear = async (summary: ISummary) => {
  const { iyear, imonth } = summary;

  await Year.updateOne(
    { year: iyear },
    {
      $push: {
        months: {
          month: imonth,
          eventsNum: 1, 
        },
      },
      $inc: { totalEvents: 1 }, 
    }
  );
};

 const createYearWithMonth = async (summary: ISummary) => {
  const { iyear, imonth } = summary;

  const newYear = await Year.create({
    year: iyear,
    months: [
      {
        month: imonth,
        eventsNum: 1, 
      },
    ],
    totalEvents: 1, 
  });

  return newYear;
};

 const updateYear = async (summary: ISummary) => {
  const iyear = summary.iyear ?? 0;
  const imonth = summary.imonth ?? 0;
  const iday = summary.iday ?? 0;

  if (!isValidDate(iyear, imonth, iday)) {
    throw new Error(
      "invalid date"
    );
  }

  if (isFutureDate(iyear, imonth, iday)) {
    throw new Error("cannot add events to future dates");
  }

  let year = await Year.findOne({ year: iyear });

  if (!year) {

    year = await createYearWithMonth(summary);
  } else {

    const monthExists = year.months.some((month) => month.month === imonth);

    if (!monthExists) {

        await addMonthToYear(summary);
    } else {

        await updateMonth(summary);
    }
  }
};

export const updateAllCollections = async (summary: any) => {
  try {

    await Promise.all([
      updateAttackType(summary), 
      updateCoordinates(summary), 
      handleCountryAndCity(summary), 
      updateOrganization(summary), 
      updateOrganizationImpact(summary), 
      updateYear(summary),
    ]);

    console.log("all collections updated successfully");
    return {succses:true}
  } catch (error) {
    console.error("error updating collections:", error);
     return { succses: false };
  }
};
