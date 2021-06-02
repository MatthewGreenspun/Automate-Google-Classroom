import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization";
import pool from "../../sql/Pool";

const router = express.Router();

router.delete("/announcement/:id", checkAuthorization, (req, res) => {
  const { id } = req.params;

  try {
    pool.query("DELETE FROM announcements WHERE announcement_id = $1", [id]);
    res.status(200).send({ message: "success" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

export default router;
