import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRoute from "./routes/user.route.ts";
import exploreRoute from "./routes/explore.route.ts";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "success!" });
});

app.use("/api/users", userRoute);
app.use("/api/explore", exploreRoute);

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});
