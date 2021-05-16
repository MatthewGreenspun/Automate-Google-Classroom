require("dotenv").config();
const cors = require("cors");
import express from "express";
import session from "express-session";
import userRouter from "./routes/user";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "./sql/Pool";

passport.serializeUser((user, done) => {
  done(null, (user as { id: string }).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const { rows: user } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: "http://localhost:8080/posts",
    },
    async (accessToken, refreshToken, profile, done) => {
      const {
        rows: [userId],
      } = await pool.query("SELECT user_id FROM users WHERE user_id = $1", [
        profile.id,
      ]);
      if (userId) {
        try {
          pool.query("UPDATE users SET refresh_token = $1 WHERE user_id = $2", [
            refreshToken,
            profile.id,
          ]);
        } catch (err) {
          console.log("error when user exists");
          console.error(err);
        }
      } else {
        try {
          pool.query(
            "INSERT INTO users (user_id, refresh_token) VALUES ($1, $2)",
            [profile.id, refreshToken]
          );
        } catch (err) {
          console.log("error when user does not exist");
          console.error(err);
        }
      }
      done(null, profile);
    }
  )
);

const app = express();

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
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<h1>Automate Google Classroom</h1><a href='/login'>login</a>");
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
  })
);

app.get(
  "/posts",
  passport.authenticate("google", { failureRedirect: "/login-fail" }),
  (req, res) => {
    if (req.user)
      res.send(`
      <pre>${JSON.stringify(req.user, null, 2)}</pre>
      <a href="/login">log in again</a>
      <a href="/logout">logout</a>
    `);
    else res.redirect("/login");
  }
);

app.get("/login-fail", (req, res) => res.send("failed to sign in"));
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.use("/api/v1", userRouter);

app.listen(8080);
