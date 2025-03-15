import express from "express";
const projectRouter = express.Router();
import {
  deleteAll,
  deleteById,
  getAllProject,
  getById,
  projectCreate,
  projectUpdateById,
} from "../controllers/project.controller.js";

projectRouter.get("/", getAllProject);
projectRouter.post("/", projectCreate);
projectRouter.get("/:id", getById);
projectRouter.patch("/:id", projectUpdateById);
projectRouter.delete("/:id", deleteById);
projectRouter.delete("/", deleteAll);

export { projectRouter };
