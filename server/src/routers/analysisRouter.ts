import { Router } from "express";
import { deadliestAttackTypes, getCountryDetails, highestCasualtyRegions, incidentTrends } from "../controllers/analysisController";

const router = Router()

router.get("/deadliest-attack-types", deadliestAttackTypes);

router.get("/highest-casualty-regions", highestCasualtyRegions);

router.get("/incident-trends", incidentTrends);

router.get("/:countryName", getCountryDetails);


export default router