import express from "express";
const router = express.Router();
import {
  deleteAll,
  deleteById,
  getAllProject,
  getById,
  projectCreate,
  projectUpdateById,
} from "../controllers/project.controller.js";
import {
  combineQuery,
  createTask,
  deleteAllTaskById,
  getAllTask,
  updateTaskById,
} from "../controllers/task.controller.js";

router.post("/project", projectCreate);
router.get("/project/", getAllProject);
router.post("/task", createTask);
router.get("/task", getAllTask);
router.delete("/project/delete/:id", deleteById);
router.post("/project/update/:id", projectUpdateById);
router.get("/project/id/:id", getById);
router.delete("/delete/project/all", deleteAll);
router.delete("/task/delete/:id", deleteAllTaskById);
router.put("/task/update/:id", updateTaskById);
router.get("/task/query", combineQuery);
export { router };
