import { Request, Response } from "express";
import { ISummary, Summary } from "../models/summary";
import { IAddEventDto } from "../types/dto";
import { dateConverter, generateEventId } from "../utils/addEventUtils";
import { updateAllCollections } from "../utils/crud";

export const createNewEvent = async (
  addEventDto: IAddEventDto
): Promise<ISummary | undefined> => {
  try {
    const {
      date,
      country,
      region,
      city,
      latitude,
      longitude,
      attacktype,
      gname,
      nkill,
      nperps,
      targtype,
      weaptype1_txt,
      nwound,
      summary,
    } = addEventDto;
    const id = generateEventId(date);
    const { iyear, imonth, iday } = dateConverter(date);
    const newEvent = new Summary({
      eventid: id,
      iyear,
      imonth,
      iday,
      country_txt: country,
      region_txt: region,
      city,
      latitude,
      longitude,
      attacktype1_txt: attacktype,
      gname,
      nkill,
      nperps,
      targtype1_txt: targtype,
      weaptype1_txt,
      nwound,
      summary,
    });
    const isUpdate = await updateAllCollections(newEvent);
    if (!isUpdate) {
      console.error("filde update all collections");
      return;
    }

    await newEvent.save();
    console.log(newEvent);
    return newEvent;
  } catch (error) {
    throw new Error("register failed");
  }
};
