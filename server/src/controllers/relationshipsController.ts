import { Request, Response } from "express";
import {
  deadliestRegionsService,
  groupsByYearService,
  topGroupsService,
} from "../services/relationshipsService";

export const groupsByYear = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;

    if (!year) {
      res.status(400).json({ error: "year parameter is required" });
      return;
    }

    const numericYear = Number(year);
    if (isNaN(numericYear)) {
      res.status(400).json({ error: "year parameter must be a valid number" });
      return;
    }

    const organizations = await groupsByYearService(numericYear);
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deadliestRegions = async (req: Request, res: Response) => {
 try {
   const { organizationName } = req.query;

   if (!organizationName) {
      res.status(400).json({ error: "organization name is required" });
      return;
   }

   const regions = await deadliestRegionsService(organizationName as string);
   res.status(200).json(regions);
 } catch (error) {
   res.status(500).json(error);
 }
};

export const topGroups = async (req: Request, res: Response) => {
  try {
    const { region } = req.query;
    if (!region) {
      res.status(400).json({ error: "region parameter is required" });
      return;
    }

    const organizations = await topGroupsService(region as string);
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json(error);
  }
};
