// import express from "express";
// import { Explore } from "../controllers/explore.controller.ts";
// import { ensureAuthenticated } from "../middleware/ensureAuthenticated.ts";

// const router = express.Router();

// router.get(
//   "/:language/:offset",
//   ensureAuthenticated,
//   Explore.explorePopularRepos
// );
// export default router;

import express from "express";
import { Explore } from "../controllers/explore.controller.ts";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.ts";

const router = express.Router();

router.get(
  "/:language/:offset",
  ensureAuthenticated,
  Explore.explorePopularRepos
);

export default router;
