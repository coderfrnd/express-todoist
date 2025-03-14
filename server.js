import express from "express";
import { connectDb } from "./app/dataBaseConfig/db.config.js";
import {
  deleteById,
  getAllProject,
  projectCreate,
} from "./app/controllers/project.controller.js";
import { createTask, getAllTask } from "./app/controllers/task.controller.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/", projectCreate);
app.get("/", getAllProject);
app.post("/task", createTask);
app.get("/task", getAllTask);
app.delete("/:id", deleteById);
app.listen(port, () => {
  console.log("Port is running on", port);
});
