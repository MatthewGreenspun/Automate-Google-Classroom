"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var checkAuthorization_1 = require("../middleware/checkAuthorization");
var Pool_1 = __importDefault(require("../../sql/Pool"));
var router = express_1.default.Router();
router.put("/announcement/:id", checkAuthorization_1.checkAuthorization, function (req, res) {
    var id = req.params.id;
    var user_id = req.user.user_id;
    var _a = req.body, courseIds = _a.courseIds, title = _a.title, announcementText = _a.announcementText, scheduledTime = _a.scheduledTime, postingDays = _a.postingDays;
    var currParam = 3;
    var changedFields = 0;
    var newValues = [];
    for (var _i = 0, _b = [
        courseIds,
        title,
        announcementText === null || announcementText === void 0 ? void 0 : announcementText.substring(0, 5000),
        scheduledTime,
        postingDays,
    ]; _i < _b.length; _i++) {
        var option = _b[_i];
        if (option !== undefined) {
            changedFields++;
            newValues.push(option);
        }
    }
    Pool_1.default
        .query("UPDATE announcements \n      SET \n        " + (courseIds
        ? "course_ids = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (title
        ? "title = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (announcementText
        ? "announcement_text = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (scheduledTime
        ? "scheduled_time = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (postingDays
        ? "posting_days = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n      WHERE announcement_id = $1 AND user_id = $2", __spreadArray([id, user_id], newValues))
        .then(function () { return res.status(200).send({ message: "success" }); })
        .catch(function (err) {
        console.error(err);
        res.status(500).send({ message: "error" });
    });
});
router.put("/saquestion/:id", checkAuthorization_1.checkAuthorization, function (req, res) {
    var id = req.params.id;
    var user_id = req.user.user_id;
    var _a = req.body, courseIds = _a.courseIds, title = _a.title, description = _a.description, scheduledTime = _a.scheduledTime, postingDays = _a.postingDays, dueDate = _a.dueDate, dueTime = _a.dueTime, submissionModifiable = _a.submissionModifiable, maxPoints = _a.maxPoints;
    var currParam = 3;
    var changedFields = 0;
    var newValues = [];
    for (var _i = 0, _b = [
        courseIds,
        title,
        description === null || description === void 0 ? void 0 : description.substring(0, 5000),
        scheduledTime,
        postingDays,
        dueDate,
        dueTime,
        submissionModifiable,
        maxPoints,
    ]; _i < _b.length; _i++) {
        var option = _b[_i];
        if (option !== undefined) {
            changedFields++;
            newValues.push(option);
        }
    }
    Pool_1.default
        .query("\n      UPDATE short_answer_questions\n      SET \n        " + (courseIds
        ? "course_ids = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (title
        ? "title = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (description
        ? "description = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (scheduledTime
        ? "scheduled_time = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (postingDays
        ? "posting_days = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (dueDate !== undefined
        ? "due_date = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (dueTime !== undefined
        ? "due_time = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (submissionModifiable
        ? "submission_modifiable = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (maxPoints
        ? "max_points = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n      WHERE sa_question_id = $1 AND user_id = $2 ", __spreadArray([id, user_id], newValues))
        .then(function () { return res.status(200).send({ message: "success" }); })
        .catch(function (err) {
        console.error(err);
        res.status(500).send({ message: "error" });
    });
});
router.put("/mcquestion/:id", checkAuthorization_1.checkAuthorization, function (req, res) {
    var id = req.params.id;
    var user_id = req.user.user_id;
    var _a = req.body, courseIds = _a.courseIds, title = _a.title, description = _a.description, scheduledTime = _a.scheduledTime, postingDays = _a.postingDays, dueDate = _a.dueDate, dueTime = _a.dueTime, submissionModifiable = _a.submissionModifiable, maxPoints = _a.maxPoints, choices = _a.choices;
    var currParam = 3;
    var changedFields = 0;
    var newValues = [];
    for (var _i = 0, _b = [
        courseIds,
        title,
        description === null || description === void 0 ? void 0 : description.substring(0, 5000),
        scheduledTime,
        postingDays,
        dueDate,
        dueTime,
        submissionModifiable,
        maxPoints,
        choices,
    ]; _i < _b.length; _i++) {
        var option = _b[_i];
        if (option !== undefined) {
            changedFields++;
            newValues.push(option);
        }
    }
    Pool_1.default
        .query("\n      UPDATE multiple_choice_questions\n      SET \n        " + (courseIds
        ? "course_ids = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (title
        ? "title = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (description
        ? "description = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (scheduledTime
        ? "scheduled_time = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (postingDays
        ? "posting_days = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (dueDate !== undefined
        ? "due_date = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (dueTime !== undefined
        ? "due_time = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (submissionModifiable
        ? "submission_modifiable = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n        " + (maxPoints
        ? "max_points = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n      " + (choices
        ? "choices = $" + currParam++ + (currParam - 3 !== changedFields ? "," : "")
        : "") + " \n      WHERE mc_question_id = $1 AND user_id = $2 ", __spreadArray([id, user_id], newValues))
        .then(function () { return res.status(200).send({ message: "success" }); })
        .catch(function (err) {
        console.error(err);
        res.status(500).send({ message: "error" });
    });
});
exports.default = router;
