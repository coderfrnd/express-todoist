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
projectRouter.get("/id/:id", getById);
projectRouter.patch("/projectById/:id", projectUpdateById);
projectRouter.delete("/delete/:id", deleteById);
projectRouter.delete("/deleteall/", deleteAll);

export { projectRouter };
