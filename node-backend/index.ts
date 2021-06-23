import app from "./express/app";
import schedule from "node-schedule";
import { postAll } from "./posting/post";

app.listen(process.env.PORT ?? 8080);

schedule.scheduleJob("0 1 * * *", () => {
  postAll();
  console.log(`successfully posted at ${new Date()}`);
});
