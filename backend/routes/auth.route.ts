import express from "express";
import passport from "passport";

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
  function (req, res) {
    console.log(
      req?.session,
      req?.isAuthenticated(),
      req?.user,
      "+++++++++++++++++++++++++++"
    );

    res.redirect(process.env.CLIENT_BASE_URL as string);
  }
);

router.get("/check", (req, res) => {
  console.log(
    req?.session,
    req?.isAuthenticated(),
    req?.user,
    "=========================="
  );

  if (req.isAuthenticated()) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: "Logged out" });
  });
});

export default router;
