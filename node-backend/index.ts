import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Automate Google Classroom</h1>");
});

app.listen(8080);
