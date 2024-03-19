import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import path from "path";

import "./passport/github.auth.ts";

import userRoutes from "./routes/user.route.ts";
import exploreRoutes from "./routes/explore.route.ts";
import authRoutes from "./routes/auth.route.ts";

import { connectMongoDB } from "./db/connectMongoDB.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const dirname = path.resolve();

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.use(express.static(path.join(dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
  connectMongoDB();
});
