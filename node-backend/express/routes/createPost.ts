import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization";
import pool from "../../sql/Pool";

const router = express.Router();

router.post("/announcement", checkAuthorization, (req, res) => {
  const {
    courseIds,
    title,
    announcementText,
    scheduledTime,
    postingDays,
  }: {
    courseIds: string[];
    title: string;
    announcementText: string;
    scheduledTime: string;
    postingDays: string[];
  } = req.body;
  const { user_id: userId } = req.user as DatabaseUserData;

  try {
    pool.query(
      `INSERT INTO announcements (announcement_id, user_id, course_ids, title, announcement_text, scheduled_time, posting_days, last_posted) 
      VALUES(uuid_generate_v4(), $1, $2, $3, $4, $5, $6, NOW())`,
      [userId, courseIds, title, announcementText, scheduledTime, postingDays]
    );
    res.status(200).send({ message: "success" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.post("/saquestion", checkAuthorization, (req, res) => {
  const {
    courseIds,
    topicId,
    title,
    description,
    postingDays,
    scheduledTime,
    dueDate,
    dueTime,
    submissionModifiable,
    maxPoints,
  }: {
    courseIds?: string[];
    topicId?: string;
    title?: string;
    description?: string;
    postingDays?: string[];
    scheduledTime?: string;
    dueDate?: string;
    dueTime?: string;
    submissionModifiable?: boolean;
    maxPoints?: number;
  } = req.body;
  const { user_id: userId } = req.user as DatabaseUserData;

  pool
    .query(
      `INSERT INTO short_answer_questions 
      (sa_question_id, user_id, course_ids,topic_id, title, description, scheduled_time, posting_days, last_posted, due_date, due_time, submission_modifiable, max_points) 
      VALUES(uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, NOW(), $8, $9, $10, $11)`,
      [
        userId,
        courseIds,
        topicId,
        title,
        description,
        scheduledTime,
        postingDays,
        dueDate,
        dueTime,
        submissionModifiable,
        maxPoints,
      ]
    )
    .then(() => res.status(200).send({ message: "success" }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err });
    });
});

export default router;
