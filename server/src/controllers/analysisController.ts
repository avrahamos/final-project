import { Request, Response } from "express";
import {
  deadliestAttackTypesService,
  getCountryDetailsService,
  highestCasualtyRegionsService,
  incidentTrendsService,
} from "../services/analysisService";

export const deadliestAttackTypes = async (req: Request, res: Response) => {
  try {
    const sortedAttackTypes = await deadliestAttackTypesService();
    res.status(200).json(sortedAttackTypes);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const highestCasualtyRegions = async (req: Request, res: Response) => {
  try {
    const countriesSorted = await highestCasualtyRegionsService();
    res.status(200).json(countriesSorted);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCountryDetails = async (req: Request, res: Response) => {
  try {
    const countryName = req.params.countryName as string;
    const countryDetails = await getCountryDetailsService(countryName);
    res.status(200).json(countryDetails);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const incidentTrends = async (req: Request, res: Response) => {
  try {
    const { type, year, startYear, endYear, limit } = req.query;
    
    const data = await incidentTrendsService(type as string, {
      year: year ? Number(year) : undefined,
      startYear: startYear ? Number(startYear) : undefined,
      endYear: endYear ? Number(endYear) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error});
  }
};
