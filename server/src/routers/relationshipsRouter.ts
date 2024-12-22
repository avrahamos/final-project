import { Router } from "express";
import { deadliestRegions, getAllOrganizations, getRegionsList, groupsByYear, topGroups } from "../controllers/relationshipsController";

const router = Router()

router.get("/regions-list", getRegionsList);

router.get("/groups-by-year", groupsByYear);

router.get("/deadliest-regions", deadliestRegions);

router.get("/top-groups", topGroups);

router.get("/organizations", getAllOrganizations);

export default router