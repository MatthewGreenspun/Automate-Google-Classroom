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
exports.postAll = void 0;
var Pool_1 = __importDefault(require("../sql/Pool"));
var timeToISO_1 = require("./timeToISO");
var shouldPostToday_1 = require("./shouldPostToday");
var googleapis_1 = require("googleapis");
function postAll() {
    return __awaiter(this, void 0, void 0, function () {
        var oAuth2Client, announcements, mcQuestions, saQuestions;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
                    return [4 /*yield*/, Pool_1.default.query("\n  \t\tSELECT announcements.*, users.refresh_token FROM announcements\n  \t\tJOIN users ON announcements.user_id = users.user_id\n   ")];
                case 1:
                    announcements = (_a.sent()).rows;
                    announcements.forEach(function (announcement) { return __awaiter(_this, void 0, void 0, function () {
                        var classroom_1;
                        return __generator(this, function (_a) {
                            if (shouldPostToday_1.shouldPostToday(announcement.posting_days)) {
                                oAuth2Client.setCredentials({
                                    refresh_token: announcement.refresh_token,
                                });
                                classroom_1 = googleapis_1.google.classroom({ version: "v1", auth: oAuth2Client });
                                announcement.course_ids.forEach(function (id) {
                                    classroom_1.courses.announcements
                                        .create({
                                        courseId: id,
                                        requestBody: {
                                            text: announcement.announcement_text,
                                            state: "DRAFT",
                                            scheduledTime: timeToISO_1.timeToISO(announcement.scheduled_time),
                                        },
                                    })
                                        .then(function () {
                                        return console.log("created announcement: " + announcement.title + " for " + timeToISO_1.timeToISO(announcement.scheduled_time));
                                    })
                                        .catch(function (err) {
                                        return console.error("error when creating announcement: " + announcement.title + " for " + timeToISO_1.timeToISO(announcement.scheduled_time) + " \n" + err + " ");
                                    });
                                });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [4 /*yield*/, Pool_1.default.query("\n  \t\tSELECT multiple_choice_questions.*, users.refresh_token FROM multiple_choice_questions\n  \t\tJOIN users ON multiple_choice_questions.user_id = users.user_id\n   ")];
                case 2:
                    mcQuestions = (_a.sent()).rows;
                    mcQuestions.forEach(function (question) { return __awaiter(_this, void 0, void 0, function () {
                        var classroom_2, dueDateTime_1;
                        return __generator(this, function (_a) {
                            if (shouldPostToday_1.shouldPostToday(question.posting_days)) {
                                oAuth2Client.setCredentials({
                                    refresh_token: question.refresh_token,
                                });
                                classroom_2 = googleapis_1.google.classroom({ version: "v1", auth: oAuth2Client });
                                dueDateTime_1 = question.due_time
                                    ? timeToISO_1.timeToISO(question.due_time)
                                    : null;
                                question.course_ids.forEach(function (id) {
                                    classroom_2.courses.courseWork
                                        .create({
                                        courseId: id,
                                        requestBody: {
                                            title: question.title,
                                            description: question.description,
                                            workType: "MULTIPLE_CHOICE_QUESTION",
                                            state: "DRAFT",
                                            multipleChoiceQuestion: {
                                                choices: question.choices,
                                            },
                                            scheduledTime: timeToISO_1.timeToISO(question.scheduled_time),
                                            dueDate: question.due_time
                                                ? {
                                                    day: Number(dueDateTime_1.substring(8, 10)),
                                                    month: Number(dueDateTime_1.substring(5, 7)),
                                                    year: Number(dueDateTime_1.substring(0, 4)),
                                                }
                                                : undefined,
                                            dueTime: question.due_time
                                                ? {
                                                    hours: Number(dueDateTime_1.substring(11, 13)),
                                                    minutes: Number(dueDateTime_1.substring(14, 16)),
                                                    seconds: 0,
                                                    nanos: 0,
                                                }
                                                : undefined,
                                            maxPoints: question.max_points,
                                            submissionModificationMode: question.submission_modifiable
                                                ? "MODIFIABLE"
                                                : "MODIFIABLE_UNTIL_TURNED_IN",
                                        },
                                    })
                                        .then(function () {
                                        return console.log("created multiple choice question: " + question.title + " for " + timeToISO_1.timeToISO(question.scheduled_time));
                                    })
                                        .catch(function (err) {
                                        return console.error("error when creating multiple choice question: " + question.title + " for " + timeToISO_1.timeToISO(question.scheduled_time) + " \n" + err + " ");
                                    });
                                });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [4 /*yield*/, Pool_1.default.query("\n\t\t\tSELECT short_answer_questions.*, users.refresh_token FROM short_answer_questions \n\t\t\tJOIN users ON short_answer_questions.user_id = users.user_id\n\t ")];
                case 3:
                    saQuestions = (_a.sent()).rows;
                    saQuestions.forEach(function (question) { return __awaiter(_this, void 0, void 0, function () {
                        var classroom_3, dueDateTime_2;
                        return __generator(this, function (_a) {
                            if (shouldPostToday_1.shouldPostToday(question.posting_days)) {
                                oAuth2Client.setCredentials({
                                    refresh_token: question.refresh_token,
                                });
                                classroom_3 = googleapis_1.google.classroom({ version: "v1", auth: oAuth2Client });
                                dueDateTime_2 = question.due_time
                                    ? timeToISO_1.timeToISO(question.due_time)
                                    : null;
                                question.course_ids.forEach(function (id) {
                                    classroom_3.courses.courseWork
                                        .create({
                                        courseId: id,
                                        requestBody: {
                                            title: question.title,
                                            description: question.description,
                                            workType: "SHORT_ANSWER_QUESTION",
                                            state: "DRAFT",
                                            scheduledTime: timeToISO_1.timeToISO(question.scheduled_time),
                                            dueDate: question.due_time
                                                ? {
                                                    day: Number(dueDateTime_2.substring(8, 10)),
                                                    month: Number(dueDateTime_2.substring(5, 7)),
                                                    year: Number(dueDateTime_2.substring(0, 4)),
                                                }
                                                : undefined,
                                            dueTime: question.due_time
                                                ? {
                                                    hours: Number(dueDateTime_2.substring(11, 13)),
                                                    minutes: Number(dueDateTime_2.substring(14, 16)),
                                                    seconds: 0,
                                                    nanos: 0,
                                                }
                                                : undefined,
                                            maxPoints: question.max_points,
                                            submissionModificationMode: question.submission_modifiable
                                                ? "MODIFIABLE"
                                                : "MODIFIABLE_UNTIL_TURNED_IN",
                                        },
                                    })
                                        .then(function () {
                                        return console.log("created short answer question: " + question.title + " for " + timeToISO_1.timeToISO(question.scheduled_time));
                                    })
                                        .catch(function (err) {
                                        return console.error("error when creating short answer question: " + question.title + " for " + timeToISO_1.timeToISO(question.scheduled_time) + " \n" + err + " ");
                                    });
                                });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
exports.postAll = postAll;
