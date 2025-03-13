import express from "express";
import { checkDbStatus } from "./app/dataBaseConfig/db.config.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
checkDbStatus();
app.get("/");

app.listen(port, () => {
  console.log("Port is running on", port);
});
