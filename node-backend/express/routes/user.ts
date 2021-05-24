import express from "express";
import pool from "../../sql/Pool";

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

export default router;
