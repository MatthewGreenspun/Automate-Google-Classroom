require("dotenv").config();
import express from "express";
import userRouter from "./routes/user";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
passport.serializeUser((user, done) => {
  done(null, (user as { id: string }).id);
});

passport.deserializeUser((id: string, done) => {});

app.get("/", (req, res) => {
  res.send("<h1>Automate Google Classroom</h1>");
});

app.use("/api/v1", userRouter);

app.listen(8080);
