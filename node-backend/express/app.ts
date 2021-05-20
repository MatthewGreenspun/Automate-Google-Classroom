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
    saveUninitialized: true, //possibly change to false in the future
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
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
    successRedirect: "/posts",
    failureRedirect: "/",
  })
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
