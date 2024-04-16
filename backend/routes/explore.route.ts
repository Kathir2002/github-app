import express from "express";
import { Explore } from "../controllers/explore.controller";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = express.Router();

router.get(
  "/:language/:offset",
  ensureAuthenticated,
  Explore.explorePopularRepos
);

export default router;
