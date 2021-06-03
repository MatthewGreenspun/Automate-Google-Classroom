import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization";
import pool from "../../sql/Pool";

const router = express.Router();

router.put("/announcement/:id", checkAuthorization, (req, res) => {
  const { id } = req.params;
  const {
    courseIds,
    title,
    announcementText,
    scheduledTime,
    postingDays,
  }: {
    courseIds?: string[];
    title?: string;
    announcementText?: string;
    scheduledTime?: string;
    postingDays?: string[];
  } = req.body;

  let currParam = 2;
  let changedFields = 0;
  let newValues: Array<string | string[]> = [];
  for (let option of [
    courseIds,
    title,
    announcementText,
    scheduledTime,
    postingDays,
  ]) {
    if (option !== undefined) {
      changedFields++;
      newValues.push(option);
    }
  }

  pool
    .query(
      `UPDATE announcements 
      SET 
        ${
          courseIds
            ? `course_ids = $${currParam++}${
                currParam - 2 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          title
            ? `title = $${currParam++}${
                currParam - 2 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          announcementText
            ? `announcement_text = $${currParam++}${
                currParam - 2 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          scheduledTime
            ? `scheduled_time = $${currParam++}${
                currParam - 2 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          postingDays
            ? `posting_days = $${currParam++}${
                currParam - 2 !== changedFields ? "," : ""
              }`
            : ""
        } 
      WHERE announcement_id = $1`,
      [id, ...newValues]
    )
    .then(() => res.status(200).send({ message: "success" }))
    .catch((err) => res.status(500).send({ error: err }));
});

export default router;
