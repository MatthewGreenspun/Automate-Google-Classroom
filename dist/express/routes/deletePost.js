"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var checkAuthorization_1 = require("../middleware/checkAuthorization");
var Pool_1 = __importDefault(require("../../sql/Pool"));
var router = express_1.default.Router();
router.delete("/announcement/:id", checkAuthorization_1.checkAuthorization, function (req, res) {
    var id = req.params.id;
    var user_id = req.user.user_id;
    try {
        Pool_1.default.query("DELETE FROM announcements WHERE announcement_id = $1 AND user_id = $2", [id, user_id]);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        res.status(500).send({ error: err });
    }
});
router.delete("/saquestion/:id", checkAuthorization_1.checkAuthorization, function (req, res) {
    var id = req.params.id;
    var user_id = req.user.user_id;
    Pool_1.default
        .query("DELETE FROM short_answer_questions WHERE sa_question_id = $1 AND user_id = $2", [id, user_id])
        .then(function () { return res.status(200).send({ message: "success" }); })
        .catch(function (err) {
        console.error(err);
        res.status(500).send({ message: "error" });
    });
});
router.delete("/mcquestion/:id", checkAuthorization_1.checkAuthorization, function (req, res) {
    var id = req.params.id;
    var user_id = req.user.user_id;
    Pool_1.default
        .query("DELETE FROM multiple_choice_questions WHERE mc_question_id = $1 AND user_id = $2", [id, user_id])
        .then(function () { return res.status(200).send({ message: "success" }); })
        .catch(function (err) {
        console.error(err);
        res.status(500).send({ message: "error" });
    });
});
exports.default = router;
