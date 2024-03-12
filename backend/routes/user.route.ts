import express from "express";
import { User } from "../controllers/user.controller";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = express.Router();

router.get("/profile/:userName", User.getUserProfileAndRepo);
router.get("/likes", ensureAuthenticated, User.getLikes);
router.post("/like/:username", ensureAuthenticated, User.likeProfile);
export default router;
