import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/user.model.ts";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((_id, done) => {
  User.findById(_id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done({ error: err }, false);
    });
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL:
        "https://github-app-api.onrender.com/api/auth/github/callback",
      // callbackURL: "http://localhost:5000/api/auth/github/callback",
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      const user = await User.findOne({ username: profile.username });
      // signup
      if (!user) {
        const newUser = new User({
          name: profile.displayName,
          username: profile.username,
          profileUrl: profile.profileUrl,
          avatarUrl: profile.photos[0].value,
          likedProfiles: [],
          likedBy: [],
        });
        await newUser.save();

        done(null, newUser);
      } else {
        done(null, user);
      }
    }
  )
);
