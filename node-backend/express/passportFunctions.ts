import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "../sql/Pool";

passport.serializeUser((user, done) => {
  done(null, (user as { id: string }).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const {
      rows: [user],
    } = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: process.env.CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      const {
        rows: [userId],
      } = await pool.query("SELECT user_id FROM users WHERE user_id = $1", [
        profile.id,
      ]);
      if (userId) {
        try {
          pool.query("UPDATE users SET refresh_token = $1 WHERE user_id = $2", [
            refreshToken,
            profile.id,
          ]);
        } catch (err) {
          console.log("error when user exists");
          console.error(err);
        }
      } else {
        try {
          pool.query(
            "INSERT INTO users (user_id, refresh_token, display_name, profile_picture_link, email) VALUES ($1, $2, $3, $4, $5)",
            [
              profile.id,
              refreshToken,
              profile.displayName,
              profile.photos && profile.photos[0]?.value, //make sure photo exists
              profile.emails && profile.emails[0]?.value, //make sure email exists
            ]
          );
        } catch (err) {
          console.log("error when user does not exist");
          console.error(err);
        }
      }
      done(null, profile);
    }
  )
);
