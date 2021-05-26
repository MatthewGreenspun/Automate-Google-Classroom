import express from "express";
import { google } from "googleapis";

const router = express.Router();

router.get("/me", (req, res) => {
  if (!req.user)
    res
      .status(401)
      .send({ error: "you are unauthorized to make this request" });
  else
    res.send({
      displayName: (req.user as DatabaseUserData).display_name,
      profilePictureLink: (req.user as DatabaseUserData).profile_picture_link,
    });
});

router.get("/courses", async (req, res) => {
  if (!req.user)
    res
      .status(401)
      .send({ error: "you are unauthorized to make this request" });
  else {
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

    res.send(courses);
  }
});

export default router;
