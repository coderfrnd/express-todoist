import express from "express";
const taskRouter = express.Router();
import {
  combineQuery,
  createTask,
  deleteAllTaskById,
  getAllTask,
  updateTaskById,
} from "../controllers/task.controller.js";

taskRouter.post("/", createTask);
taskRouter.get("/", getAllTask);
taskRouter.delete("/delete/:id", deleteAllTaskById);
taskRouter.patch("/update/:id", updateTaskById);
taskRouter.get("/query", combineQuery);

export { taskRouter };
