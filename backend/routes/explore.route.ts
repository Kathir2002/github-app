import express from "express";
import { Explore } from "../controllers/explore.controller";

const router = express.Router();

router.get("/:language/:offset", Explore.explorePopularRepos);
export default router;
