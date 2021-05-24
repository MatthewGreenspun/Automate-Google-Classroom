import express from "express";
import passport from "passport";
import pool from "../../sql/Pool";

const router = express.Router();

router.get("/me", (req, res) => {
  if (!req.user)
    res
      .status(401)
      .send({ error: "you are unauthorized to make this request" });
  else
    pool
      .query(
        "SELECT display_name AS displayName, profile_picture_link AS profilePictureLink FROM users WHERE user_id = $1",
        [(req.user as { user_id: string }[])[0].user_id]
      )
      .then(({ rows }) => res.send(JSON.stringify(rows[0])));
});

export default router;
