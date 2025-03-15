import express from "express";
import { connectDb } from "./app/dataBaseConfig/db.config.js";
import { router } from "./app/router/routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/page", router);
app.listen(port, () => {
  console.log("Port is running on", port);
});
