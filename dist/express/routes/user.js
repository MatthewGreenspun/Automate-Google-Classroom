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
var express_1 = __importDefault(require("express"));
var googleapis_1 = require("googleapis");
var checkAuthorization_1 = require("../middleware/checkAuthorization");
var Pool_1 = __importDefault(require("../../sql/Pool"));
var router = express_1.default.Router();
router.get("/me", function (req, res) {
    res.send({
        user: req.user
            ? {
                displayName: req.user.display_name,
                profilePictureLink: req.user
                    .profile_picture_link,
            }
            : null,
    });
});
router.get("/courses", checkAuthorization_1.checkAuthorization, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oAuth2Client, classroom, courses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "http://localhost:8080/auth/googlecallback");
                oAuth2Client.setCredentials({
                    refresh_token: req.user.refresh_token,
                });
                classroom = googleapis_1.google.classroom({ version: "v1", auth: oAuth2Client });
                return [4 /*yield*/, classroom.courses.list({})];
            case 1:
                courses = (_a.sent()).data.courses;
                res.send(courses === null || courses === void 0 ? void 0 : courses.map(function (course) { return ({ courseId: course.id, courseName: course.name }); }));
                return [2 /*return*/];
        }
    });
}); });
router.get("/announcements", checkAuthorization_1.checkAuthorization, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Pool_1.default.query("SELECT announcement_id, course_ids, title, announcement_text, scheduled_time, posting_days FROM announcements WHERE user_id = $1", [req.user.user_id])];
            case 1:
                rows = (_a.sent()).rows;
                res.send(rows.map(
                //convert to camelCase
                function (_a) {
                    var announcement_id = _a.announcement_id, course_ids = _a.course_ids, title = _a.title, announcement_text = _a.announcement_text, scheduled_time = _a.scheduled_time, posting_days = _a.posting_days;
                    return ({
                        announcementId: announcement_id,
                        courseIds: course_ids,
                        title: title,
                        announcementText: announcement_text,
                        scheduledTime: scheduled_time,
                        postingDays: posting_days,
                    });
                }));
                return [2 /*return*/];
        }
    });
}); });
router.get("/saquestions", checkAuthorization_1.checkAuthorization, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Pool_1.default.query("SELECT \n      sa_question_id AS question_id, description, due_date, due_time, max_points, submission_modifiable, topic_id, course_ids, title, scheduled_time, posting_days   \n      FROM short_answer_questions \n      WHERE user_id = $1", [req.user.user_id])];
            case 1:
                rows = (_a.sent()).rows;
                res.send(rows.map(
                //convert to camelCase
                function (_a) {
                    var question_id = _a.question_id, description = _a.description, due_date = _a.due_date, due_time = _a.due_time, max_points = _a.max_points, submission_modifiable = _a.submission_modifiable, topic_id = _a.topic_id, course_ids = _a.course_ids, title = _a.title, scheduled_time = _a.scheduled_time, posting_days = _a.posting_days;
                    return ({
                        questionId: question_id,
                        description: description,
                        title: title,
                        dueDate: due_date,
                        dueTime: due_time,
                        submissionModifiable: submission_modifiable,
                        topicId: topic_id,
                        maxPoints: max_points,
                        courseIds: course_ids,
                        scheduledTime: scheduled_time,
                        postingDays: posting_days,
                    });
                }));
                return [2 /*return*/];
        }
    });
}); });
router.get("/mcquestions", checkAuthorization_1.checkAuthorization, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Pool_1.default.query("SELECT \n      mc_question_id AS question_id, description, due_date, due_time, max_points, submission_modifiable, topic_id, course_ids, title, scheduled_time, posting_days, choices\n      FROM multiple_choice_questions \n      WHERE user_id = $1", [req.user.user_id])];
            case 1:
                rows = (_a.sent()).rows;
                res.send(rows.map(
                //convert to camelCase
                function (_a) {
                    var question_id = _a.question_id, description = _a.description, choices = _a.choices, due_date = _a.due_date, due_time = _a.due_time, max_points = _a.max_points, submission_modifiable = _a.submission_modifiable, topic_id = _a.topic_id, course_ids = _a.course_ids, title = _a.title, scheduled_time = _a.scheduled_time, posting_days = _a.posting_days;
                    return ({
                        questionId: question_id,
                        description: description,
                        title: title,
                        choices: choices,
                        dueDate: due_date,
                        dueTime: due_time,
                        submissionModifiable: submission_modifiable,
                        topicId: topic_id,
                        maxPoints: max_points,
                        courseIds: course_ids,
                        scheduledTime: scheduled_time,
                        postingDays: posting_days,
                    });
                }));
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
