"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var cors = require("cors");
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var user_1 = __importDefault(require("./routes/user"));
var auth_1 = __importDefault(require("./routes/auth"));
var createPost_1 = __importDefault(require("./routes/createPost"));
var editPost_1 = __importDefault(require("./routes/editPost"));
var deletePost_1 = __importDefault(require("./routes/deletePost"));
var passport_1 = __importDefault(require("passport"));
var Pool_1 = __importDefault(require("../sql/Pool"));
var path_1 = __importDefault(require("path"));
require("./passportFunctions");
var app = express_1.default();
app.use(
  express_1.default.static(path_1.default.join(__dirname, "../", "build"))
);
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(
  express_session_1.default({
    store: new (require("connect-pg-simple")(express_session_1.default))({
      pool: Pool_1.default,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 6 }, // currently 6 hour, possibly change in prod
  })
);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("/", function (req, res) {
  res.redirect(process.env.FRONTEND_URL);
});
app.get("/posts", function (req, res) {
  if (req.user) res.redirect(process.env.FRONTEND_URL + "/posts");
  else res.redirect("/auth/login");
});
app.use("/auth", auth_1.default);
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/createpost", createPost_1.default);
app.use("/api/v1/editpost", editPost_1.default);
app.use("/api/v1/deletepost", deletePost_1.default);
exports.default = app;
