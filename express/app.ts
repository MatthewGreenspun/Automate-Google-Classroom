require("dotenv").config();
const cors = require("cors");
import express from "express";
import session from "express-session";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";
import createPostRouter from "./routes/createPost";
import editpostRouter from "./routes/editPost";
import deletePostRouter from "./routes/deletePost";
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
    cookie: { maxAge: 1000 * 60 * 60 * 6 }, // currently 6 hour, possibly change in prod
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "build", "index.html"));
});

app.get("/posts", (req, res) => {
  if (req.user) {
    res.sendFile(path.join(__dirname, "../", "build", "index.html"));
    console.log("req.user on posts route:", req.user);
  } else res.redirect("/auth/login");
});

app.use("/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/createpost", createPostRouter);
app.use("/api/v1/editpost", editpostRouter);
app.use("/api/v1/deletepost", deletePostRouter);

export default app;
