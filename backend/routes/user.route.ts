import express from "express";
import { User } from "../controllers/user.controller";

const router = express.Router();

router.get("/profile/:userName", User.getUserProfileAndRepo);
export default router;
