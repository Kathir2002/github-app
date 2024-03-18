import express from "express";
import { User } from "../controllers/user.controller.ts";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.ts";

const router = express.Router();

router.get("/profile/:username", User.getUserProfileAndRepo);
router.get("/likes", ensureAuthenticated, User.getLikes);
router.post("/like/:username", ensureAuthenticated, User.likeProfile);
export default router;
