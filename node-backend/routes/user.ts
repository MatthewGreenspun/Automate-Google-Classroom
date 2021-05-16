import express from "express";

const router = express.Router();

router.get("/user", (req, res) => {
  res.send(
    `<pre>${JSON.stringify(
      { displayName: "Matthew", email: "mg@gmail.com" },
      null,
      2
    )}`
  );
});

export default router;
