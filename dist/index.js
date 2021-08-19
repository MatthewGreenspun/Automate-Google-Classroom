"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./express/app"));
var node_schedule_1 = __importDefault(require("node-schedule"));
var post_1 = require("./posting/post");
app_1.default.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080);
if (process.argv.includes("--post"))
    node_schedule_1.default.scheduleJob("0 1 * * *", function () {
        post_1.postAll();
        console.log("successfully posted at " + new Date());
    });
else
    console.log("running server without posting any posts");
