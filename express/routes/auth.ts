import express from "express";
import passport from "passport";

const router = express.Router();
const scopes = [
  //resources that will be accessed. Read more at https://developers.google.com/identity/protocols/oauth2/scopes
  "profile",
  "email",
  "https://www.googleapis.com/auth/classroom.courses.readonly",
  "https://www.googleapis.com/auth/classroom.announcements",
  "https://www.googleapis.com/auth/classroom.coursework.students",
];

router.get(
  "/login",
  passport.authenticate("google", {
    scope: scopes,
    accessType: "offline",
    prompt: "consent",
    successRedirect: "/googlecallback",
    failureRedirect: "/",
  })
);

router.get(
  "/googlecallback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: process.env.FRONTEND_URL + "/posts",
  }),
  (req, res) => {
    req.session.save(() => {
      res.redirect(process.env.FRONTEND_URL + "/posts");
    });
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
