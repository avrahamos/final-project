import { AttackType } from "../models/atackType";
import { Coordinates } from "../models/coordinates";
import { Country } from "../models/country";
import { ISummary } from "../models/summary";

export const updateAttackType = async (summary: ISummary) => {
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

export const updateCoordinates = async (summary: ISummary) => {
  const { latitude, longitude, city, country_txt, region_txt } = summary;

  await Coordinates.updateOne(
    { latitude, longitude },
    {
      $set: { city, country: country_txt, region: region_txt },
    },
    { upsert: true }
  );
};

export const createCountryAndCity = async (summary: ISummary) => {
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

export const updateCityInCountry = async (summary: ISummary) => {
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

export const addCityToCountry = async (summary: ISummary) => {
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


export const handleCountryAndCity = async (summary: ISummary) => {
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

