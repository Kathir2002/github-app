import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import "./passport/github.auth.ts";

import userRoutes from "./routes/user.route.ts";
import exploreRoutes from "./routes/explore.route.ts";
import authRoutes from "./routes/auth.route.ts";
dotenv.config();

import { connectMongoDB } from "./db/connectMongoDB.ts";

const mongoStore = new MongoStore({
  mongoUrl: process.env.MONGO_URI,
  collectionName: "sessions",
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://github-app01.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: mongoStore,
    cookie: { maxAge: 60 * 1000 * 60 * 60, secure: false },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
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
