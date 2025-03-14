import express from "express";
import { connectDb } from "./app/dataBaseConfig/db.config.js";
import {
  deleteAll,
  deleteById,
  getAllProject,
  getById,
  projectCreate,
  projectUpdateById,
} from "./app/controllers/project.controller.js";
import {
  completedTask,
  createTask,
  deleteAllTaskById,
  getAllTask,
  updateTaskById,
} from "./app/controllers/task.controller.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/", projectCreate);
app.get("/", getAllProject);
app.post("/task", createTask);
app.get("/task", getAllTask);
app.delete("/project/delete/:id", deleteById);
app.post("/project/update/:id", projectUpdateById);
app.get("/project/:id", getById);
app.delete("/project", deleteAll);
app.delete("/task/delete/:id", deleteAllTaskById);
app.put("/task/update/:id", updateTaskById);
app.get("/task/completed", completedTask);
app.listen(port, () => {
  console.log("Port is running on", port);
});
