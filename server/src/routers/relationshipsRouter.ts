import { Router } from "express";
import { deadliestRegions, groupsByYear, topGroups } from "../controllers/relationshipsController";

const router = Router()

router.get("groups-by-year", groupsByYear);

router.get("deadliest-regions", deadliestRegions);

router.get("top-groups", topGroups);



export default router