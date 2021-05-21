require("dotenv").config();
const cors = require("cors");
import express from "express";
import session from "express-session";
import userRouter from "./routes/user";
import passport from "passport";
import pool from "../sql/Pool";
import path from "path";
import "./passportFunctions";

const app = express();
app.use(express.static(path.join(__dirname, "../", "build")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      pool: pool,
    }),
    secret: process.env.COOKIE_SECRET as string,
    resave: false,
    saveUninitialized: true, //possibly change in the future
    cookie: { maxAge: 60 }, // currently 1 minute, change to much longer in prod
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "build", "index.html"));
});

const scopes = [
  "profile",
  "email",
  "https://www.googleapis.com/auth/classroom.courses.readonly",
  "https://www.googleapis.com/auth/classroom.announcements",
  "https://www.googleapis.com/auth/classroom.coursework.students",
];
app.get(
  "/login",
  passport.authenticate("google", {
    scope: scopes,
    accessType: "offline",
    prompt: "consent",
    successRedirect: "/googlecallback",
    failureRedirect: "/",
  })
);

app.get(
  "/googlecallback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.save(() => {
      res.redirect("/posts");
    });
  }
);

app.get("/posts", (req, res) => {
  if (req.user)
    res.sendFile(path.join(__dirname, "../", "build", "index.html"));
  else res.redirect("/login");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.use("/api/v1", userRouter);
export default app;
