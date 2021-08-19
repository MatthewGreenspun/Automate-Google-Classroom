"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = require("passport-google-oauth20");
var Pool_1 = __importDefault(require("../sql/Pool"));
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (id, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Pool_1.default.query("SELECT * FROM users WHERE user_id = $1", [id])];
            case 1:
                user = (_a.sent()).rows[0];
                done(null, user);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                done(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/googlecallback",
}, function (accessToken, refreshToken, profile, done) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, Pool_1.default.query("SELECT user_id FROM users WHERE user_id = $1", [
                    profile.id,
                ])];
            case 1:
                userId = (_c.sent()).rows[0];
                if (userId) {
                    try {
                        Pool_1.default.query("UPDATE users SET refresh_token = $1 WHERE user_id = $2", [
                            refreshToken,
                            profile.id,
                        ]);
                    }
                    catch (err) {
                        console.log("error when user exists");
                        console.error(err);
                    }
                }
                else {
                    try {
                        Pool_1.default.query("INSERT INTO users (user_id, refresh_token, display_name, profile_picture_link, email) VALUES ($1, $2, $3, $4, $5)", [
                            profile.id,
                            refreshToken,
                            profile.displayName,
                            profile.photos && ((_a = profile.photos[0]) === null || _a === void 0 ? void 0 : _a.value),
                            profile.emails && ((_b = profile.emails[0]) === null || _b === void 0 ? void 0 : _b.value), //make sure email exists
                        ]);
                    }
                    catch (err) {
                        console.log("error when user does not exist");
                        console.error(err);
                    }
                }
                done(null, profile);
                return [2 /*return*/];
        }
    });
}); }));
