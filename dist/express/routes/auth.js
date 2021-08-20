"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var router = express_1.default.Router();
var scopes = [
  //resources that will be accessed. Read more at https://developers.google.com/identity/protocols/oauth2/scopes
  "profile",
  "email",
  "https://www.googleapis.com/auth/classroom.courses.readonly",
  "https://www.googleapis.com/auth/classroom.announcements",
  "https://www.googleapis.com/auth/classroom.coursework.students",
];
router.get(
  "/login",
  passport_1.default.authenticate("google", {
    scope: scopes,
    accessType: "offline",
    prompt: "consent",
    successRedirect: "/googlecallback",
    failureRedirect: "/",
  })
);
router.get(
  "/googlecallback",
  passport_1.default.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    req.session.save(function () {
      res.redirect(process.env.FRONTEND_URL + "/posts");
    });
  }
);
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
exports.default = router;
