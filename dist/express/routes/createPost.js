"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var checkAuthorization_1 = require("../middleware/checkAuthorization");
var Pool_1 = __importDefault(require("../../sql/Pool"));
var router = express_1.default.Router();
router.post("/announcement", checkAuthorization_1.checkAuthorization, function (req, res) {
    var _a = req.body, courseIds = _a.courseIds, title = _a.title, announcementText = _a.announcementText, scheduledTime = _a.scheduledTime, postingDays = _a.postingDays;
    var userId = req.user.user_id;
    try {
        Pool_1.default.query("INSERT INTO announcements (announcement_id, user_id, course_ids, title, announcement_text, scheduled_time, posting_days, last_posted) \n      VALUES(uuid_generate_v4(), $1, $2, $3, $4, $5, $6, NOW())", [
            userId,
            courseIds,
            title,
            announcementText.substring(0, 5000),
            scheduledTime,
            postingDays,
        ]);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        res.status(500).send({ error: err });
    }
});
router.post("/saquestion", checkAuthorization_1.checkAuthorization, function (req, res) {
    var _a = req.body, courseIds = _a.courseIds, topicId = _a.topicId, title = _a.title, description = _a.description, postingDays = _a.postingDays, scheduledTime = _a.scheduledTime, dueDate = _a.dueDate, dueTime = _a.dueTime, submissionModifiable = _a.submissionModifiable, maxPoints = _a.maxPoints;
    var userId = req.user.user_id;
    Pool_1.default
        .query("INSERT INTO short_answer_questions \n      (sa_question_id, user_id, course_ids,topic_id, title, description, scheduled_time, posting_days, last_posted, due_date, due_time, submission_modifiable, max_points) \n      VALUES(uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, NOW(), $8, $9, $10, $11)", [
        userId,
        courseIds,
        topicId,
        title,
        description === null || description === void 0 ? void 0 : description.substring(0, 5000),
        scheduledTime,
        postingDays,
        dueDate,
        dueTime,
        submissionModifiable,
        maxPoints,
    ])
        .then(function () { return res.status(200).send({ message: "success" }); })
        .catch(function (err) {
        console.error(err);
        res.status(500).send({ message: "error" });
    });
});
router.post("/mcquestion", checkAuthorization_1.checkAuthorization, function (req, res) {
    var _a = req.body, courseIds = _a.courseIds, topicId = _a.topicId, title = _a.title, description = _a.description, postingDays = _a.postingDays, scheduledTime = _a.scheduledTime, dueDate = _a.dueDate, dueTime = _a.dueTime, submissionModifiable = _a.submissionModifiable, maxPoints = _a.maxPoints, choices = _a.choices;
    var userId = req.user.user_id;
    Pool_1.default
        .query("INSERT INTO multiple_choice_questions \n      (mc_question_id, user_id, course_ids,topic_id, title, description, scheduled_time, posting_days, last_posted, due_date, due_time, submission_modifiable, max_points, choices) \n      VALUES(uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, NOW(), $8, $9, $10, $11, $12)", [
        userId,
        courseIds,
        topicId,
        title,
        description === null || description === void 0 ? void 0 : description.substring(0, 5000),
        scheduledTime,
        postingDays,
        dueDate,
        dueTime,
        submissionModifiable,
        maxPoints,
        choices,
    ])
        .then(function () { return res.status(200).send({ message: "success" }); })
        .catch(function (err) {
        console.error(err);
        res.status(500).send({ message: "error" });
    });
});
exports.default = router;
