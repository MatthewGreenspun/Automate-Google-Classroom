import pool from "../sql/Pool";
import { timeToISO } from "./timeToISO";
import { google } from "googleapis";

export async function postAll() {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );

  const { rows: announcements } = await pool.query<AnnouncementToPost>(`
  		SELECT announcements.*, users.refresh_token FROM announcements
  		JOIN users ON announcements.user_id = users.user_id
   `);

  announcements.forEach(async (announcement) => {
    oAuth2Client.setCredentials({
      refresh_token: announcement.refresh_token,
    });

    const classroom = google.classroom({ version: "v1", auth: oAuth2Client });
    announcement.course_ids!.forEach((id) => {
      classroom.courses.announcements
        .create({
          courseId: id,
          requestBody: {
            text: announcement.announcement_text,
            state: "DRAFT",
            scheduledTime: timeToISO(announcement.scheduled_time!),
          },
        })
        .then(() =>
          console.log(
            `created announcement: ${announcement.title} for ${timeToISO(
              announcement.scheduled_time!
            )}`
          )
        )
        .catch((err) =>
          console.error(
            `error when creating announcement: ${
              announcement.title
            } for ${timeToISO(announcement.scheduled_time!)} \n${err} `
          )
        );
    });
  });

  const { rows: mcQuestions } = await pool.query<McQuestionToPost>(`
			SELECT multiple_choice_questions.*, users.refresh_token FROM multiple_choice_questions 
			JOIN users ON multiple_choice_questions.user_id = users.user_id
	 `);

  mcQuestions.forEach(async (question) => {
    oAuth2Client.setCredentials({
      refresh_token: question.refresh_token,
    });

    const classroom = google.classroom({ version: "v1", auth: oAuth2Client });

    const dueDateTime = question.due_time ? timeToISO(question.due_time) : null;

    question.course_ids!.forEach((id) => {
      classroom.courses.courseWork
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
            scheduledTime: timeToISO(question.scheduled_time!),
            dueDate: question.due_time
              ? {
                  day: Number(dueDateTime!.substring(8, 10)),
                  month: Number(dueDateTime!.substring(5, 7)),
                  year: Number(dueDateTime!.substring(0, 4)),
                }
              : undefined,
            dueTime: question.due_time
              ? {
                  hours: Number(dueDateTime!.substring(11, 13)),
                  minutes: Number(dueDateTime!.substring(14, 16)),
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
        .then(() =>
          console.log(
            `created multiple choice question: ${
              question.title
            } for ${timeToISO(question.scheduled_time!)}`
          )
        )
        .catch((err) =>
          console.error(
            `error when creating multiple choice question: ${
              question.title
            } for ${timeToISO(question.scheduled_time!)} \n${err} `
          )
        );
    });
  });
}
