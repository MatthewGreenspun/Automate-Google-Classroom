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

export default router;
