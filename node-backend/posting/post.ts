import pool from "../sql/Pool";
import { timeToISO } from "./timeToISO";
import { google } from "googleapis";

export async function postAll() {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );

  const { rows } = await pool.query<AnnouncementToPost>(`
			SELECT announcements.*, users.refresh_token FROM announcements 
			JOIN users ON announcements.user_id = users.user_id
	 `);

  rows.forEach(async (announcement) => {
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
            //scheduledTime: timeToISO(announcement.scheduled_time!),
          },
        })
        .then(() => console.log(`created announcement: ${announcement.title}`))
        .catch((err) =>
          console.error(
            `error when creating announcement: ${announcement.title}\n${err} `
          )
        );
    });
  });
}
