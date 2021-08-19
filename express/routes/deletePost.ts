import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization";
import pool from "../../sql/Pool";

const router = express.Router();

router.delete("/announcement/:id", checkAuthorization, (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user as DatabaseUserData;

  try {
    pool.query(
      "DELETE FROM announcements WHERE announcement_id = $1 AND user_id = $2",
      [id, user_id]
    );
    res.status(200).send({ message: "success" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.delete("/saquestion/:id", checkAuthorization, (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user as DatabaseUserData;

  pool
    .query(
      "DELETE FROM short_answer_questions WHERE sa_question_id = $1 AND user_id = $2",
      [id, user_id]
    )
    .then(() => res.status(200).send({ message: "success" }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "error" });
    });
});

router.delete("/mcquestion/:id", checkAuthorization, (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user as DatabaseUserData;

  pool
    .query(
      "DELETE FROM multiple_choice_questions WHERE mc_question_id = $1 AND user_id = $2",
      [id, user_id]
    )
    .then(() => res.status(200).send({ message: "success" }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "error" });
    });
});

export default router;
