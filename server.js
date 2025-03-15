import express from "express";
import { connectDb } from "./app/dataBaseConfig/db.config.js";
import { router } from "./app/router/routes.js";
import { taskRouter } from "./app/router/taskRouter.js";
import { projectRouter } from "./app/router/projectRouter.js";

const app = express();
const port = process.env.PORT || 3000;

// taskRouter
app.use(express.json());
app.use("/task", taskRouter);
app.use("/project", projectRouter);
app.listen(port, () => {
  console.log("Port is running on", port);
});
