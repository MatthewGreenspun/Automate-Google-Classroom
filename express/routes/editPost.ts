import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization";
import pool from "../../sql/Pool";

const router = express.Router();

router.put("/announcement/:id", checkAuthorization, (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user as DatabaseUserData;

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

  let currParam = 3;
  let changedFields = 0;
  let newValues: Array<string | string[]> = [];
  for (let option of [
    courseIds,
    title,
    announcementText?.substring(0, 5000),
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
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          title
            ? `title = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          announcementText
            ? `announcement_text = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          scheduledTime
            ? `scheduled_time = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          postingDays
            ? `posting_days = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
      WHERE announcement_id = $1 AND user_id = $2`,
      [id, user_id, ...newValues]
    )
    .then(() => res.status(200).send({ message: "success" }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "error" });
    });
});

router.put("/saquestion/:id", checkAuthorization, (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user as DatabaseUserData;

  const {
    courseIds,
    title,
    description,
    scheduledTime,
    postingDays,
    dueDate,
    dueTime,
    submissionModifiable,
    maxPoints,
  }: {
    courseIds?: string[];
    title?: string;
    description?: string;
    scheduledTime?: string;
    postingDays?: string[];
    dueDate?: string | null;
    dueTime?: string | null;
    submissionModifiable?: boolean;
    maxPoints?: number;
  } = req.body;

  let currParam = 3;
  let changedFields = 0;
  let newValues: Array<string | string[] | boolean | number | null> = [];
  for (let option of [
    courseIds,
    title,
    description?.substring(0, 5000),
    scheduledTime,
    postingDays,
    dueDate,
    dueTime,
    submissionModifiable,
    maxPoints,
  ]) {
    if (option !== undefined) {
      changedFields++;
      newValues.push(option);
    }
  }
  pool
    .query(
      `
      UPDATE short_answer_questions
      SET 
        ${
          courseIds
            ? `course_ids = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          title
            ? `title = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          description
            ? `description = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          scheduledTime
            ? `scheduled_time = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          postingDays
            ? `posting_days = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          dueDate !== undefined
            ? `due_date = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          dueTime !== undefined
            ? `due_time = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          submissionModifiable
            ? `submission_modifiable = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          maxPoints
            ? `max_points = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
      WHERE sa_question_id = $1 AND user_id = $2 `,
      [id, user_id, ...newValues]
    )
    .then(() => res.status(200).send({ message: "success" }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "error" });
    });
});

router.put("/mcquestion/:id", checkAuthorization, (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user as DatabaseUserData;

  const {
    courseIds,
    title,
    description,
    scheduledTime,
    postingDays,
    dueDate,
    dueTime,
    submissionModifiable,
    maxPoints,
    choices,
  }: {
    courseIds?: string[];
    title?: string;
    description?: string;
    scheduledTime?: string;
    postingDays?: string[];
    dueDate?: string | null;
    dueTime?: string | null;
    submissionModifiable?: boolean;
    maxPoints?: number;
    choices: string[];
  } = req.body;

  let currParam = 3;
  let changedFields = 0;
  let newValues: Array<string | string[] | boolean | number | null> = [];
  for (let option of [
    courseIds,
    title,
    description?.substring(0, 5000),
    scheduledTime,
    postingDays,
    dueDate,
    dueTime,
    submissionModifiable,
    maxPoints,
    choices,
  ]) {
    if (option !== undefined) {
      changedFields++;
      newValues.push(option);
    }
  }
  pool
    .query(
      `
      UPDATE multiple_choice_questions
      SET 
        ${
          courseIds
            ? `course_ids = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          title
            ? `title = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          description
            ? `description = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          scheduledTime
            ? `scheduled_time = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          postingDays
            ? `posting_days = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          dueDate !== undefined
            ? `due_date = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          dueTime !== undefined
            ? `due_time = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          submissionModifiable
            ? `submission_modifiable = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
        ${
          maxPoints
            ? `max_points = $${currParam++}${
                currParam - 3 !== changedFields ? "," : ""
              }`
            : ""
        } 
      ${
        choices
          ? `choices = $${currParam++}${
              currParam - 3 !== changedFields ? "," : ""
            }`
          : ""
      } 
      WHERE mc_question_id = $1 AND user_id = $2 `,
      [id, user_id, ...newValues]
    )
    .then(() => res.status(200).send({ message: "success" }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "error" });
    });
});

export default router;
