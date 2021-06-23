import app from "./express/app";
import { postAll } from "./posting/post";

app.listen(process.env.PORT ?? 8080);
postAll();
