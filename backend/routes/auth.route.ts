import express, { Response } from "express";
import passport from "passport";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import UserModel from "../models/user.model";
import { decryptDetails, encryptDetails } from "../lib/functions";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: process.env.CLIENT_BASE_URL + "/login",
    session: true,
  }),
  function (req: any, res) {
    if (!req.user) {
      console.log("User not found!");
    } else {
      const jwtToken = jwt.sign(
        {
          _id: req.user._id,
          email: req.user.username,
        },
        process.env.JWT_KEY!,
        {
          expiresIn: "2h",
        }
      );
      const encryptedToken = encryptDetails(jwtToken);
      // Explicitly save the session before redirecting!
      req.session.save(() => {
        res
          ?.cookie("token", encryptedToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
            sameSite: "none",
            secure: true,
          })
          .redirect(process.env.CLIENT_BASE_URL!);
      });
    }
  }
);

router.get("/check", ensureAuthenticated, async (req: any, res: Response) => {
  try {
    const user = await UserModel.findById(req._id.toString());
    if (user) {
      res.send(user);
    } else {
      res.send({ user: null });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error in checking login status!", err });
  }
});

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token", { path: "/", sameSite: "none", secure: true });
    res.clearCookie("connect.sid", {
      path: "/",
      sameSite: "none",
      secure: true,
    });
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });

    return res
      .status(200)
      .json({ status: true, message: "Logged out successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out!", error });
  }
});

export default router;
