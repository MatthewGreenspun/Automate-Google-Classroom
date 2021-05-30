import express from "express";
import { google } from "googleapis";
import { checkAuthorization } from "../middleware/checkAuthorization";
import pool from "../../sql/Pool";

const router = express.Router();

router.get("/me", (req, res) => {
  res.send({
    user: req.user
      ? {
          displayName: (req.user as DatabaseUserData).display_name,
          profilePictureLink: (req.user as DatabaseUserData)
            .profile_picture_link,
        }
      : null,
  });
});

router.get("/courses", checkAuthorization, async (req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:8080/auth/googlecallback"
  );

  oAuth2Client.setCredentials({
    refresh_token: (req.user as DatabaseUserData).refresh_token,
  });
  const classroom = google.classroom({ version: "v1", auth: oAuth2Client });
  const {
    data: { courses },
  } = await classroom.courses.list({});

  res.send(
    courses?.map((course) => ({ courseId: course.id, courseName: course.name }))
  );
});

router.get("/announcements", checkAuthorization, async (req, res) => {
  const { rows }: { rows: DatabaseAnnouncementData[] } = await pool.query(
    "SELECT announcement_id, course_ids, title, announcement_text, scheduled_time, posting_days FROM announcements WHERE user_id = $1",
    [(req.user as DatabaseUserData).user_id]
  );

  res.send(
    rows.map(
      //convert to camelCase
      ({
        announcement_id,
        course_ids,
        title,
        announcement_text,
        scheduled_time,
        posting_days,
      }) => ({
        announcementId: announcement_id,
        courseIds: course_ids,
        title,
        announcementText: announcement_text,
        scheduledTime: scheduled_time,
        postingDays: posting_days,
      })
    )
  );
});

export default router;
