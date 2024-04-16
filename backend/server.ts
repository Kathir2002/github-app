import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";

import "./passport/github.auth";

import userRoutes from "./routes/user.route";
import exploreRoutes from "./routes/explore.route";
import authRoutes from "./routes/auth.route";

import { connectMongoDB } from "./db/connectMongoDB";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "https://githup-app.netlify.app",
    credentials: true,
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
  connectMongoDB();
});
